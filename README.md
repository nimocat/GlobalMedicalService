# Global Medical Service

本项目为国际医疗服务平台的前后端基础实现，提供预约中国医疗服务、估算飞行时间与治疗时间，并推荐可配置的医疗方案。

## 目录结构

- `frontend/`：React 前端页面（使用 CDN 快速启动）
- `backend/`：FastAPI 后端服务

## 前端启动方式

可以通过任意静态服务器启动，例如：

```bash
cd frontend
python -m http.server 5173
```

访问 `http://localhost:5173`。

## 后端启动方式

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

## 后端接口

- `GET /plans`：获取医疗方案
- `POST /plans`：新增医疗方案
- `PUT /plans/{plan_id}`：更新医疗方案
- `POST /estimate`：估算飞行时间与治疗周期
- `POST /contact`：提交预约请求（1 个工作日内回复）
