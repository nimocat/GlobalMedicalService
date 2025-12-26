const { useMemo, useState } = React;

const plans = [
  {
    id: 1,
    name: "极速转诊方案",
    description: "48小时内完成病例评估与专家匹配，快速锁定最佳医院与医生。",
    benefit: "平均节省等待时间 5-10 天",
  },
  {
    id: 2,
    name: "国际协作方案",
    description: "国内三甲医院与国际专家联合远程会诊，提供第二诊疗意见。",
    benefit: "降低误诊风险，优化治疗路径",
  },
  {
    id: 3,
    name: "全程陪同方案",
    description: "提供翻译、预约、住院陪护与出院随访服务。",
    benefit: "缩短沟通与办理流程时间",
  },
];

const flightMap = {
  上海: 2.5,
  北京: 3.0,
  广州: 3.5,
  深圳: 3.2,
  成都: 2.8,
  纽约: 14.0,
  伦敦: 11.5,
  新加坡: 5.0,
};

const treatmentMap = {
  心血管: 7,
  肿瘤: 14,
  骨科: 5,
  神经: 10,
  内分泌: 6,
};

function estimateTime(location, disease) {
  const flight = flightMap[location] ?? 6.0;
  const treatment = treatmentMap[disease] ?? 7;
  const total = (treatment + flight / 24).toFixed(2);
  return {
    flight,
    treatment,
    total,
  };
}

function App() {
  const [location, setLocation] = useState("上海");
  const [disease, setDisease] = useState("心血管");
  const [selectedPlan, setSelectedPlan] = useState(plans[0].id);
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [message, setMessage] = useState("");

  const estimate = useMemo(() => estimateTime(location, disease), [location, disease]);
  const plan = plans.find((item) => item.id === selectedPlan) ?? plans[0];

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="badge">国际医疗服务平台</p>
          <h1>全球医疗服务平台</h1>
          <p className="subtitle">
            根据客户所在地与疾病，快速预估飞行时间与治疗时间，并提供可定制的国际医疗方案。
          </p>
          <div className="hero-actions">
            <button className="primary">立即预约咨询</button>
            <button className="ghost">了解平台优势</button>
          </div>
        </div>
        <div className="hero-card">
          <h3>时间与质量提升</h3>
          <ul>
            <li>平均节约等待 5-10 天</li>
            <li>国际多学科会诊提升诊疗质量</li>
            <li>专属协调团队缩短沟通流程</li>
          </ul>
        </div>
      </header>

      <section className="grid">
        <div className="card">
          <h2>智能时间预估</h2>
          <p className="helper">输入所在城市与疾病类型，系统将估算飞行时间与治疗周期。</p>
          <div className="form">
            <label>
              所在城市
              <input value={location} onChange={(event) => setLocation(event.target.value)} />
            </label>
            <label>
              疾病类型
              <input value={disease} onChange={(event) => setDisease(event.target.value)} />
            </label>
          </div>
          <div className="estimate">
            <div>
              <span>预估飞行时间</span>
              <strong>{estimate.flight} 小时</strong>
            </div>
            <div>
              <span>预估治疗时间</span>
              <strong>{estimate.treatment} 天</strong>
            </div>
            <div>
              <span>总耗时</span>
              <strong>{estimate.total} 天</strong>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>推荐医疗方案</h2>
          <p className="helper">方案可由 agency 预设并在后台调整。</p>
          <div className="plans">
            {plans.map((item) => (
              <button
                type="button"
                key={item.id}
                className={`plan ${selectedPlan === item.id ? "active" : ""}`}
                onClick={() => setSelectedPlan(item.id)}
              >
                <h4>{item.name}</h4>
                <p>{item.description}</p>
                <span>{item.benefit}</span>
              </button>
            ))}
          </div>
          <div className="plan-highlight">
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <p className="highlight">{plan.benefit}</p>
          </div>
        </div>
      </section>

      <section className="grid">
        <div className="card">
          <h2>国际医疗方案优势</h2>
          <ul className="list">
            <li>整合全球医院资源，缩短等待时间</li>
            <li>跨国专家联合会诊，提升治疗准确率</li>
            <li>支持多语言沟通与签证协助</li>
            <li>治疗后持续随访，提升康复质量</li>
          </ul>
        </div>
        <div className="card">
          <h2>预约与咨询</h2>
          <p className="helper">填写联系信息，我们将在一个工作日内回复。</p>
          <div className="form">
            <label>
              Email
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label>
              Telegram
              <input
                placeholder="@username"
                value={telegram}
                onChange={(event) => setTelegram(event.target.value)}
              />
            </label>
            <label>
              WhatsApp
              <input
                placeholder="+86"
                value={whatsapp}
                onChange={(event) => setWhatsapp(event.target.value)}
              />
            </label>
            <label>
              需求说明
              <textarea
                rows="3"
                placeholder="请描述病情与期望时间"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </label>
            <button className="primary">发送预约</button>
          </div>
          <div className="contact-note">
            <p>Telegram/WhatsApp 可快速咨询，Email 将在 1 个工作日内回复。</p>
          </div>
        </div>
      </section>

      <footer>
        <p>Global Medical Service · 以最快速度连接全球医疗资源</p>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
