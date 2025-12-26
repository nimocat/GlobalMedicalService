from datetime import datetime
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, Field

app = FastAPI(title="Global Medical Service")


class TreatmentPlan(BaseModel):
    id: int
    name: str
    description: str
    benefit_summary: str
    estimated_quality_gain: str


class PlanCreate(BaseModel):
    name: str
    description: str
    benefit_summary: str
    estimated_quality_gain: str


class EstimateRequest(BaseModel):
    location: str = Field(..., description="客户所在地点")
    disease: str = Field(..., description="所患疾病")


class EstimateResponse(BaseModel):
    location: str
    disease: str
    flight_time_hours: float
    treatment_time_days: int
    total_time_days: float
    recommended_plan: TreatmentPlan


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    telegram: Optional[str] = None
    whatsapp: Optional[str] = None
    message: str


FLIGHT_TIME_BY_CITY = {
    "上海": 2.5,
    "北京": 3.0,
    "广州": 3.5,
    "深圳": 3.2,
    "成都": 2.8,
    "纽约": 14.0,
    "伦敦": 11.5,
    "新加坡": 5.0,
}

TREATMENT_DAYS_BY_DISEASE = {
    "心血管": 7,
    "肿瘤": 14,
    "骨科": 5,
    "神经": 10,
    "内分泌": 6,
}

PLANS: List[TreatmentPlan] = [
    TreatmentPlan(
        id=1,
        name="极速转诊方案",
        description="48小时内完成病例评估与国内专家匹配，快速锁定最佳医院与医生。",
        benefit_summary="平均节省等待时间 5-10 天",
        estimated_quality_gain="引入多学科会诊，提升诊疗准确度",
    ),
    TreatmentPlan(
        id=2,
        name="国际协作方案",
        description="国内三甲医院与国际专家远程会诊，提供第二诊疗意见。",
        benefit_summary="减少误诊风险，优化治疗路径",
        estimated_quality_gain="结合国际指南，提升治疗成功率",
    ),
    TreatmentPlan(
        id=3,
        name="全程陪同方案",
        description="提供翻译、预约、住院陪护与出院随访服务。",
        benefit_summary="缩短沟通与办理流程时间",
        estimated_quality_gain="提升患者体验与依从性",
    ),
]


@app.get("/plans", response_model=List[TreatmentPlan])
def list_plans() -> List[TreatmentPlan]:
    return PLANS


@app.post("/plans", response_model=TreatmentPlan)
def create_plan(plan: PlanCreate) -> TreatmentPlan:
    new_id = max((item.id for item in PLANS), default=0) + 1
    new_plan = TreatmentPlan(id=new_id, **plan.model_dump())
    PLANS.append(new_plan)
    return new_plan


@app.put("/plans/{plan_id}", response_model=TreatmentPlan)
def update_plan(plan_id: int, plan: PlanCreate) -> TreatmentPlan:
    for index, item in enumerate(PLANS):
        if item.id == plan_id:
            updated = TreatmentPlan(id=plan_id, **plan.model_dump())
            PLANS[index] = updated
            return updated
    raise HTTPException(status_code=404, detail="Plan not found")


@app.post("/estimate", response_model=EstimateResponse)
def estimate_times(payload: EstimateRequest) -> EstimateResponse:
    flight_time = FLIGHT_TIME_BY_CITY.get(payload.location, 6.0)
    treatment_days = TREATMENT_DAYS_BY_DISEASE.get(payload.disease, 7)
    recommended_plan = PLANS[0]
    total_time_days = treatment_days + flight_time / 24

    return EstimateResponse(
        location=payload.location,
        disease=payload.disease,
        flight_time_hours=round(flight_time, 1),
        treatment_time_days=treatment_days,
        total_time_days=round(total_time_days, 2),
        recommended_plan=recommended_plan,
    )


@app.post("/contact")
def contact(payload: ContactRequest) -> dict:
    return {
        "received_at": datetime.utcnow().isoformat(),
        "message": "我们已收到您的预约请求，将在一个工作日内回复。",
    }
