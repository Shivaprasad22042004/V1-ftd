import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Cpu,
  Download,
  Edit3,
  Eye,
  Factory,
  FileBarChart,
  FileText,
  Filter,
  Gauge,
  Grid2X2,
  Info,
  LayoutDashboard,
  ListChecks,
  Lock,
  LogOut,
  Mail,
  Menu,
  MoreVertical,
  MoveVertical,
  PanelLeftClose,
  PanelLeftOpen,
  Phone,
  Plus,
  Radio,
  RefreshCcw,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Thermometer,
  Trash2,
  TrendingUp,
  User,
  UserPlus,
  Users,
  Waves,
  X,
  Zap,
} from "lucide-react";
import "./styles.css";

type Page =
  | "login"
  | "dashboard"
  | "production"
  | "machines"
  | "machine-detail"
  | "work-orders"
  | "handover"
  | "sensors"
  | "alerts"
  | "reports"
  | "team"
  | "settings";

type Tone = "blue" | "green" | "orange" | "red" | "purple" | "slate";

const nav = [
  ["dashboard", LayoutDashboard, "Dashboard"],
  ["production", Gauge, "Production Overview"],
  ["machines", BriefcaseBusiness, "Machines"],
  ["work-orders", ClipboardCheck, "Work Orders"],
  ["sensors", Zap, "Sensor Health"],
  ["alerts", Bell, "Alerts"],
  ["reports", FileBarChart, "Reports"],
  ["team", Users, "Team"],
  ["settings", Settings, "Settings"],
] as const;

const machines = [
  ["CNC Turn 01", "MT-01", 82.4, "green"],
  ["VMC 02", "VM-02", 76.1, "green"],
  ["CNC Turn 02", "MT-02", 68.3, "orange"],
  ["Drill Press 03", "DP-03", 61.2, "orange"],
  ["Surface Grinder 01", "SG-01", 45.8, "red"],
];

const workOrders = [
  ["WO-2024-05-1256", "Hoist Housing", "PN-350-102", 12, "May 24, 2024", "High", "In Progress", 82],
  ["WO-2024-05-1255", "Trolley Frame", "PN-210-450", 8, "May 26, 2024", "Medium", "In Progress", 65],
  ["WO-2024-05-1254", "End Truck Beam", "PN-110-220", 4, "May 28, 2024", "Medium", "In Progress", 45],
  ["WO-2024-05-1253", "Gearbox Cover", "PN-420-330", 6, "May 30, 2024", "Low", "Released", 28],
  ["WO-2024-05-1252", "Bridge Beam", "PN-510-780", 2, "Jun 02, 2024", "High", "Released", 15],
  ["WO-2024-05-1251", "Control Enclosure", "PN-650-910", 3, "Jun 05, 2024", "Medium", "Draft", 0],
  ["WO-2024-05-1250", "Cable Reel", "PN-740-660", 5, "Jun 07, 2024", "Low", "Completed", 100],
  ["WO-2024-04-1249", "Limit Switch Bracket", "PN-830-120", 10, "Apr 30, 2024", "Low", "Completed", 100],
];

const alerts = [
  ["CNC Turn 01", "Spindle Overload", "Repeated 3 times (24h)", "Critical", "1h 26m", "Today, 08:34 AM", "Maintenance Team"],
  ["VMC 02", "Overcurrent", "Repeated 2 times (24h)", "Critical", "54m", "Today, 08:06 AM", "Electrical Team"],
  ["Drill Press 03", "Unexpected Downtime", "Unplanned Stop", "Critical", "2h 18m", "Today, 07:12 AM", "Maintenance Team"],
  ["Surface Grinder 01", "Spindle Overheat", "Repeated 2 times (24h)", "Critical", "42m", "Today, 06:48 AM", "Maintenance Team"],
  ["Hydraulic Press 02", "High Vibration", "Repeated 3 times (24h)", "Critical", "1h 05m", "Today, 05:55 AM", "Maintenance Team"],
  ["Assembly Cell 04", "Delivery Delay Risk", "Material Flow Halted", "Critical", "3h 10m", "Today, 05:22 AM", "Production Team"],
  ["Robotic Weld Cell 01", "Overcurrent", "Repeated 2 times (24h)", "High", "31m", "Today, 07:28 AM", "Electrical Team"],
];

const sensors = [
  ["CT-001", "CNC Turn 01", "Unit 1", "Connected", "Strong", "20 sec ago", "12.4 A"],
  ["CT-002", "VMC 02", "Unit 1", "Connected", "Strong", "35 sec ago", "8.7 A"],
  ["CT-003", "Drill Press 03", "Unit 1", "No Data", "Medium", "15 min ago", "-"],
  ["CT-004", "Surface Grinder 01", "Unit 2", "Connected", "Strong", "18 sec ago", "6.2 A"],
  ["CT-005", "Welding Station 02", "Unit 2", "Offline", "None", "2 hrs ago", "-"],
  ["CT-006", "Air Compressor 01", "Unit 2", "Connected", "Strong", "22 sec ago", "3.1 A"],
  ["CT-007", "Hydraulic Press 01", "Unit 1", "No Data", "Weak", "30 min ago", "-"],
  ["CT-008", "Laser Cutter 01", "Unit 2", "Connected", "Strong", "10 sec ago", "15.6 A"],
];

const team = [
  ["Ravi Patil", "ravi.patil@acme.com", "Owner", "All Units", "Active", "Today, 10:24 AM", "12 May 2024"],
  ["Amit Sharma", "amit.sharma@acme.com", "Manager", "Unit 1, Unit 2", "Active", "Today, 09:15 AM", "14 May 2024"],
  ["Priya Patel", "priya.patel@acme.com", "Operator", "Unit 1", "Active", "Today, 08:45 AM", "16 May 2024"],
  ["Mahesh Kumar", "mahesh.kumar@acme.com", "Maintainer", "Unit 2, Unit 3", "Active", "Yesterday, 06:30 PM", "10 May 2024"],
  ["Rohit Singh", "rohit.singh@acme.com", "Operator", "Unit 2", "Active", "Yesterday, 04:20 PM", "18 May 2024"],
  ["Neha Kulkarni", "neha.kulkarni@acme.com", "Manager", "Unit 3", "Active", "19 May 2024, 11:05 AM", "11 May 2024"],
  ["Suresh Gupta", "suresh.gupta@acme.com", "Maintainer", "Unit 1", "Inactive", "5 May 2024", "01 May 2024"],
  ["Vikram Mehta", "vikram.mehta@acme.com", "Operator", "Unit 3", "Pending", "-", "Invited on 19 May 2024"],
];

function App() {
  const [page, setPage] = useState<Page>("login");
  const [dashboardReady, setDashboardReady] = useState(true);
  const [customize, setCustomize] = useState(false);
  const [actionModal, setActionModal] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const shell = page !== "login";

  return (
    <div className={shell ? `app-shell ${sidebarCollapsed ? "sidebar-collapsed" : ""}` : ""}>
      {shell && !sidebarCollapsed && <Sidebar page={page} setPage={setPage} mobileOpen={mobileNav} close={() => setMobileNav(false)} />}
      <main className={shell ? "workspace" : "login-only"}>
        {shell && (
          <Topbar
            setPage={setPage}
            openMenu={() => setMobileNav(true)}
            openCustomize={() => setCustomize(true)}
            sidebarCollapsed={sidebarCollapsed}
            toggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        )}
        {page === "login" && <Login onLogin={() => setPage("dashboard")} />}
        {page === "dashboard" && <Dashboard ready={dashboardReady} toggleReady={() => setDashboardReady(!dashboardReady)} setPage={setPage} />}
        {page === "production" && <Production />}
        {page === "machines" && <Machines setPage={setPage} />}
        {page === "machine-detail" && <MachineDetail setPage={setPage} />}
        {page === "work-orders" && <WorkOrders setPage={setPage} />}
        {page === "handover" && <Handover setPage={setPage} />}
        {page === "sensors" && <Sensors />}
        {page === "alerts" && <Alerts openAction={() => setActionModal(true)} />}
        {page === "reports" && <Reports setPage={setPage} />}
        {page === "team" && <Team />}
        {page === "settings" && <SettingsPage />}
      </main>
      {customize && <CustomizeModal close={() => setCustomize(false)} />}
      {actionModal && <TakeActionModal close={() => setActionModal(false)} />}
    </div>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo">
      <div className="logo-mark">N</div>
      {!compact && <span>NeoLift</span>}
    </div>
  );
}

function Sidebar({
  page,
  setPage,
  mobileOpen,
  close,
}: {
  page: Page;
  setPage: (page: Page) => void;
  mobileOpen: boolean;
  close: () => void;
}) {
  return (
    <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
      <Logo />
      <nav>
        {nav.map(([id, Icon, label]) => (
          <button
            key={id}
            className={`nav-item ${page === id || (page === "machine-detail" && id === "machines") || (page === "handover" && id === "work-orders") ? "active" : ""}`}
            onClick={() => {
              setPage(id);
              close();
            }}
          >
            <Icon size={21} />
            <span>{label}</span>
            {id === "alerts" && <b className="pill red">03</b>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="user-box">
          <User size={22} />
          <span><b>Ravi Patil</b><small>Owner</small></span>
          <ChevronDown size={16} />
        </button>
        <button className="nav-item"><LogOut size={20} /> Logout</button>
        <div className="quick-title">Quick Actions <Zap size={16} /></div>
        <button className="quick"><FileText size={18} /> Generate Report</button>
        <button className="quick"><Edit3 size={18} /> View Alerts <b className="pill red">03</b></button>
      </div>
    </aside>
  );
}

function Topbar({
  setPage,
  openMenu,
  openCustomize,
  sidebarCollapsed,
  toggleSidebar,
}: {
  setPage: (page: Page) => void;
  openMenu: () => void;
  openCustomize: () => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
}) {
  return (
    <header className="topbar">
      <button className="icon-btn mobile-menu" onClick={openMenu}><Menu size={21} /></button>
      <button className="icon-btn sidebar-toggle" onClick={toggleSidebar} title={sidebarCollapsed ? "Show sidebar" : "Hide sidebar"} aria-label={sidebarCollapsed ? "Show sidebar" : "Hide sidebar"}>
        {sidebarCollapsed ? <PanelLeftOpen size={22} /> : <PanelLeftClose size={22} />}
      </button>
      <div className="searchbar"><Search size={21} /> <input placeholder="Search for machines, metrics, orders..." /></div>
      <div className="top-actions">
        <button className="icon-btn has-badge" onClick={() => setPage("alerts")}><Bell size={22} /><span>3</span></button>
        <button className="icon-btn"><CircleHelp size={22} /></button>
        <button className="outline-btn" onClick={openCustomize}><SlidersHorizontal size={18} /> Customize Dashboard</button>
      </div>
    </header>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="login-page">
      <header className="login-header">
        <Logo />
        <div><span><CircleHelp size={18} /> Need help?</span><span><ShieldCheck size={19} /> Secure Access</span></div>
      </header>
      <section className="login-grid">
        <div className="login-card intro">
          <Logo />
          <p className="sub">Factory visibility in your pocket</p>
          <hr />
          <h1>Welcome back.</h1>
          <h2>Owner Login</h2>
          {[
            [TrendingUp, "Track production in real time", "Stay on top of output, OEE, and targets."],
            [Zap, "Control energy and costs", "Monitor consumption and reduce waste."],
            [Bell, "Act on what matters", "Get alerts, insights, and quality updates."],
          ].map(([Icon, title, desc]) => (
            <div className="feature" key={title as string}><span><Icon size={28} /></span><div><b>{title as string}</b><small>{desc as string}</small></div></div>
          ))}
          <div className="secure-strip"><ShieldCheck size={32} /><div><b>Secure role-based access</b><small>Your data is encrypted and access is limited to your role.</small></div></div>
        </div>
        <div className="login-card form-card">
          <div className="login-tabs">
            <button className="active"><Phone size={27} /> Phone number</button>
            <button><Mail size={27} /> Email</button>
            <button><Lock size={26} /> PIN</button>
          </div>
          <h3>Login with phone number</h3>
          <p>We'll send you an OTP to verify your number</p>
          <div className="phone-field"><span>🇮🇳</span><b>+91</b><ChevronDown size={17} /><input placeholder="Enter mobile number" /></div>
          <button className="primary wide" onClick={onLogin}>Continue <ChevronRight /></button>
          <div className="or"><span />or<span /></div>
          <button className="link-btn"><Factory size={21} /> Create factory account <ChevronRight size={18} /></button>
          <div className="secure-strip small"><ShieldCheck size={30} /><div><b>Secure role-based access</b><small>Your data is encrypted and always protected.</small></div></div>
        </div>
      </section>
      <footer className="trust-row">
        {["Enterprise-grade security", "Encrypted data", "99.9% uptime", "Trusted by 1000+ factories"].map((x) => <span key={x}><ShieldCheck size={24} /><b>{x}</b><small>Reliable and protected</small></span>)}
      </footer>
    </div>
  );
}

function PageHead({ title, desc, actions }: { title: string; desc?: string; actions?: React.ReactNode }) {
  return <div className="page-head"><div><h1>{title}</h1>{desc && <p>{desc}</p>}</div><div className="head-actions">{actions}</div></div>;
}

function Controls({ production = false }: { production?: boolean }) {
  return (
    <div className="controls">
      {production ? <Select icon={<Factory size={18} />} label="Unit A" /> : <Segments items={["All Units", "Unit View", "Compare Units"]} />}
      <Select icon={<Calendar size={18} />} label={production ? "20 May 2025" : "Today, 20 May 2024"} />
      {production && <Segments items={["Morning", "Evening", "Night"]} />}
      <Select label="Shift 1 (06:00 AM - 02:00 PM)" />
      {!production && <Select icon={<span className="dot green" />} label="Auto refresh Every 30 sec" />}
    </div>
  );
}

function Segments({ items }: { items: string[] }) {
  return <div className="segments">{items.map((item, i) => <button key={item} className={i === 0 ? "active" : ""}>{item}</button>)}</div>;
}

function Select({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return <button className="select">{icon}<span>{label}</span><ChevronDown size={17} /></button>;
}

function StatCard({ icon: Icon, title, value, meta, tone = "blue" }: { icon: any; title: string; value: string; meta: string; tone?: Tone }) {
  return <div className="stat-card"><span className={`icon-bubble ${tone}`}><Icon size={28} /></span><div><small>{title}</small><strong>{value}</strong><p>{meta}</p></div></div>;
}

function MetricCard({ icon: Icon, title, value, unit, change, tone = "blue" }: { icon: any; title: string; value: string; unit: string; change: string; tone?: Tone }) {
  return <div className="metric-card"><div><span className={`mini-icon ${tone}`}><Icon size={24} /></span><b>{title}</b><ChevronRight size={18} /></div><strong>{value}</strong><small>{unit}</small><p className={change.startsWith("↑") ? "up" : change.startsWith("↓") ? "down" : ""}>{change}</p></div>;
}

function Dashboard({ ready, toggleReady, setPage }: { ready: boolean; toggleReady: () => void; setPage: (p: Page) => void }) {
  return (
    <section className="page dashboard-page">
      <Controls />
      <button className="ghost tiny" onClick={toggleReady}>{ready ? "Show empty state" : "Load sample data"}</button>
      <div className="dashboard-layout">
        <div className="main-column">
          <div className="top-summary">
            <StatInline icon={Thermometer} value="23.4°" label="AVG. TEMPERATURE" />
            <StatInline icon={TrendingUp} value="72.2%" label="QUALITY RATE" />
            <StatInline icon={Zap} value="4.7 kWh" label="ENERGY CONSUMPTION" />
          </div>
          <div className="grid four">
            <MetricCard icon={Gauge} title="Shift Target vs Actual" value={ready ? "1,200 / 1,050" : "-- / --"} unit="Units" change={ready ? "87.5% of target" : "--% of target"} />
            <MetricCard icon={Clock3} title="Downtime Minutes today" value={ready ? "38" : "--"} unit="Minutes" change={ready ? "↑ 15% vs yesterday" : "-- vs yesterday"} tone="red" />
            <MetricCard icon={Zap} title="Energy Consumption Today" value={ready ? "4.7" : "--"} unit="kWh" change={ready ? "↓ 8.2% vs yesterday" : "-- vs yesterday"} />
            <MetricCard icon={BarChart3} title="Plant Utilisation" value={ready ? "81.3%" : "--%"} unit="Utilisation" change={ready ? "↑ 3.4% vs yesterday" : "-- vs yesterday"} tone="green" />
          </div>
          <div className="grid two">
            <Card title="OEE Summary" action={<Select label={ready ? "Monthly" : "Today"} />}>
              <Donut value={ready ? 82 : 0} label="TOTAL OEE" />
              <Legend items={[["Availability", ready ? "15%" : "--%", "green"], ["Performance", ready ? "75%" : "--%", "blue"], ["Quality", ready ? "10%" : "--%", "orange"]]} />
            </Card>
            <Card title="Top 5 Machines by OEE" action={<Select label="Today" />}>
              {ready ? <MachineBars setPage={setPage} /> : <EmptyState title="Data is coming in..." text="Machine performance will appear once we start receiving data." />}
            </Card>
          </div>
          <div className="grid two">
            <Card title="Energy Parameters">
              <div className="energy-widget"><Donut value={ready ? 74 : 0} icon={<Zap size={34} />} /><div><p>Active Power <b>{ready ? "14.2 kW/m" : "-- kW"}</b></p><p>Active Current <b>{ready ? "22.4 A/m" : "-- A"}</b></p><p>Energy / Shift <b>{ready ? "428.5 kWh" : "-- kWh"}</b></p></div></div>
            </Card>
            <Card title="Energy Consumption vs Plan" action={<Select label="Today" />}>
              <LineChart />
            </Card>
          </div>
          <ShiftSummary ready={ready} />
        </div>
        <aside className="right-column">
          <ProductionPlan ready={ready} />
          <AlertsPanel ready={ready} />
        </aside>
      </div>
    </section>
  );
}

function StatInline({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return <div><Icon size={31} /><strong>{value}</strong><small>{label}</small></div>;
}

function ProductionPlan({ ready }: { ready: boolean }) {
  return <Card title="Production Plan" action={<Badge tone={ready ? "green" : "orange"}>{ready ? "On Track" : "No Data Yet"}</Badge>}>
    {ready ? <><div className="plan-row"><div><small>Planned Output</small><b>1,500 <em>Units</em></b></div><div><small>Actual</small><b>1,247 <em>Units</em></b></div><div><small>Progress</small><strong>83%</strong></div></div><Progress value={83} /><button className="work-link">WO-2024-05-1256 <ChevronRight /></button></> : <EmptyState title="Plan data will appear here" text="Once we start receiving machine data." action="Open Production Plan" />}
  </Card>;
}

function AlertsPanel({ ready }: { ready: boolean }) {
  const rows = ready ? [
    ["Low Threshold Energy", "Threshold energy below 30% - urgent notice recommended", "red"],
    ["Requires Immediate Maintenance", "Vibration anomaly detected - potential bearing failure", "blue"],
    ["High Energy Consumption", "Energy usage is 16% higher than usual during this shift.", "orange"],
    ["Overdue Preventive Maintenance", "Maintenance is overdue by 2 days for Hydraulic System", "red"],
    ["QC Check Pending", "Quality check pending for Batch #B-2456", "blue"],
  ] : new Array(4).fill(["No alerts yet", "Alerts will appear here once we start receiving data.", "red"]);
  return <Card title="Alerts" action={<button className="text-link">Show all</button>}>{rows.map(([title, text, tone]) => <AlertMini key={title + text} title={title} text={text} tone={tone as Tone} />)}</Card>;
}

function Production() {
  const jobs = ["WO-240 Gear Housing", "WO-241 Shaft-32mm", "WO-245 Cover Plate", "WO-236 Bearing Cap", "WO-242 End Bracket", "WO-247 Spacer Ring", "WO-234 Base Plate", "WO-243 Support Arm", "WO-246 Connector Block", "WO-233 Washer Set", "WO-244 Guide Block"];
  return <section className="page"><PageHead title="Production Overview" desc="Monitor production performance, machine status, and operational insights." actions={<><button className="outline-btn"><Filter size={18} /> Filters</button><button className="primary"><Download size={18} /> Export Plan</button></>} /><Controls production /><div className="grid six"><StatCard icon={ClipboardCheck} title="Planned Jobs" value="128" meta="Total jobs planned" /><StatCard icon={CheckCircle2} title="Scheduled Jobs" value="112" meta="87% of planned jobs" tone="green" /><StatCard icon={BarChart3} title="Capacity Utilization" value="78%" meta="Overall utilization" tone="green" /><StatCard icon={Clock3} title="Delayed Jobs" value="16" meta="At risk of delay" tone="red" /><StatCard icon={Cpu} title="Machine Availability" value="92%" meta="Available machines" /><StatCard icon={Gauge} title="Plan vs Capacity" value="96%" meta="Plan within capacity" tone="orange" /></div><div className="production-grid"><Card title="Unscheduled Work Orders" action={<Badge>12</Badge>}><SimpleTable headers={["WO Number", "Product", "Qty", "Due", "Priority"]} rows={["WO-248|Gear Housing|120|22 May|Critical", "WO-252|Shaft-32mm|80|23 May|High", "WO-255|Bearing Cap|150|23 May|High", "WO-256|Cover Plate|200|24 May|Medium", "WO-259|Spacer Ring|100|24 May|Medium", "WO-261|End Bracket|60|25 May|Low", "WO-263|Connector Block|90|25 May|Low", "WO-265|Base Plate|70|26 May|Low"].map(r => r.split("|"))} /></Card><Card title="Shift × Machine Plan" className="span-2"><div className="kanban">{["Machine", "Morning Shift", "Evening Shift", "Night Shift"].map(h => <b key={h}>{h}</b>)}{["CNC-01", "CNC-02", "Press-01", "Press-02", "Assembly Line A", "Assembly Line B"].map((m, i) => <React.Fragment key={m}><strong>{m}</strong><JobCard text={jobs[i * 2] || jobs[0]} alert={i === 0 || i === 4} /><JobCard text={jobs[i * 2 + 1] || jobs[1]} running /><JobCard text={jobs[i + 2] || jobs[2]} /></React.Fragment>)}</div></Card><Card title="Overall Delivery Outlook"><div className="risk"><Gauge size={72} /><div><b>Medium Risk</b><p>Plan is at risk due to delayed jobs and high load on 3 work centers.</p></div></div></Card><Card title="Carry Forward Jobs" className="span-2"><SimpleTable headers={["WO Number", "Product", "Original Shift", "Delay Reason", "New Planned Shift"]} rows={["WO-228|Gear Housing|19 May (Evening)|Machine breakdown|20 May (Evening)", "WO-231|Shaft-32mm|19 May (Night)|Material delay|20 May (Night)", "WO-229|Bearing Cap|19 May (Evening)|Quality hold|21 May (Morning)", "WO-230|Cover Plate|19 May (Night)|Operator unavailable|21 May (Evening)"].map(r => r.split("|"))} /></Card></div></section>;
}

function Machines({ setPage }: { setPage: (p: Page) => void }) {
  const cells = ["A1-01", "A1-02", "A1-03", "A1-04", "A1-05", "A1-06", "B1-01", "B1-02", "B1-03", "B1-04", "QC-01", "QC-02", "QC-03", "QC-04", "P1-01", "P1-02", "P1-03", "P1-04"];
  return <section className="page"><PageHead title="Live Machine Status" actions={<Select icon={<span className="dot green" />} label="Auto refresh Every 30 sec" />} /><Segments items={["All Units", "Unit View", "Compare Units"]} /><div className="grid four"><StatCard icon={PlayIcon} title="Running Machines" value="7" meta="58.3% of total" tone="green" /><StatCard icon={PauseIcon} title="Idle Machines" value="3" meta="25.0% of total" tone="orange" /><StatCard icon={StopIcon} title="Down Machines" value="2" meta="16.7% of total" tone="red" /><StatCard icon={AlertTriangle} title="Active Alerts" value="5" meta="Critical / Repeat" tone="red" /></div><div className="legend-row"><Legend items={[["Running", "", "green"], ["Idle", "", "orange"], ["Down", "", "red"], ["Maintenance", "", "blue"], ["Offline", "", "slate"]]} /><p><Info size={17} /> Tap a machine to view details</p></div><Card title="" className="factory-map"><div className="machine-map">{["LINE A", "LINE B", "QUALITY CHECK", "PACKAGING"].map(zone => <div className="zone" key={zone}><h3>{zone}</h3><div>{cells.splice(0, zone === "PACKAGING" ? 4 : zone === "QUALITY CHECK" ? 4 : 6).map((id, i) => <button key={id} className={`machine-tile ${i === 2 ? "idle" : i === 1 && zone !== "LINE A" ? "down" : i === 5 ? "offline" : ""}`} onClick={() => setPage("machine-detail")}><b>{id}</b><small>{i === 2 ? "Idle" : i === 5 ? "Offline" : i === 1 && zone !== "LINE A" ? "Down" : "Running"}</small><em>{i === 5 ? "No job assigned" : "Job #J-10" + (21 + i)}</em><span><Zap size={13} /> {i === 1 && zone !== "LINE A" ? 0 : 72 + i}%</span></button>)}</div></div>)}</div></Card><div className="grid three"><Card title="Recent Alerts"><SimpleList items={["B1-02 - Spindle overload detected - Critical", "QC-03 - Machine stopped unexpectedly - Repeat", "P1-02 - High vibration detected - Warning", "A1-03 - Machine idle for 10+ min - Warning", "A1-06 - Machine offline - Info"]} /></Card><Card title="Top Machines by Utilisation"><MachineBars setPage={setPage} /></Card><Card title="Machine Health Overview"><div className="health"><ShieldCheck size={42} /><b>Overall Health: Good</b><p>Most machines are operating within normal parameters.</p></div><SimpleList items={["Avg Utilisation 71%", "Healthy Machines 7 / 12", "Attention Required 3", "Critical Machines 1", "Sensor Connectivity 98.6%"]} /></Card></div></section>;
}

function MachineDetail({ setPage }: { setPage: (p: Page) => void }) {
  return <section className="page"><button className="back" onClick={() => setPage("machines")}><ChevronLeft size={18} /> Back to Andon</button><PageHead title="CNC Turn 01" desc="CNC Turning Center · Plant 1 · Shopfloor A" actions={<Badge tone="green">Running</Badge>} /><div className="machine-id"><span><small>Machine ID</small><b>M1-01</b></span><span><small>Model</small><b>DMG CTX 310</b></span><span><small>Serial No.</small><b>CTX310-2021-001</b></span><MoreVertical /></div><div className="top-summary wide"><StatInline icon={Gauge} value="22.4 A" label="Current (A)" /><StatInline icon={Zap} value="14.2 kW" label="Active Power" /><StatInline icon={FileText} value="428.5 kWh" label="Energy (Today)" /><StatInline icon={BarChart3} value="81.3%" label="Utilisation" /><StatInline icon={Clock3} value="38 min" label="Downtime (Today)" /></div><div className="grid two"><Card title="Machine State - Last 24 Hours"><TimelineBars /></Card><Card title="Energy Trend - Last 24 Hours" action={<Segments items={["kWh", "kW"]} />}><LineChart /></Card></div><div className="grid four machine-detail-grid"><Card title="Recent Alerts"><SimpleList items={["Low Threshold Energy - Today, 10:23 AM", "Vibration Anomaly Detected - Today, 08:12 AM", "High Energy Consumption - Yesterday, 05:45 PM"]} /><button className="text-link">View Alerts</button></Card><Card title="Repeated Stoppage Pattern"><div className="pattern"><FileText size={28} /><b>Identified Pattern</b><span>Hydraulic Pressure Drop</span></div><SimpleList items={["Occurrences (Today) 3", "Total Downtime 18 min", "Avg. Downtime 6 min", "First Occurrence 08:14 AM"]} /></Card><Card title="Compared with Plant Average"><SimpleList items={["Utilisation 81.3% ↑ 8.7%", "Energy / Hour 17.4 kWh ↑ 23.4%", "Active Power 14.2 kW ↑ 15.4%", "Downtime / Day 38 min ↓ 32.1%"]} /></Card><Card title="Related Work Orders"><WorkOrderMini /><WorkOrderMini closed /></Card></div></section>;
}

function WorkOrders({ setPage }: { setPage: (p: Page) => void }) {
  return <section className="page split-page"><div><PageHead title="Work Orders" desc="Review work order progress, linked jobs, and delivery readiness." actions={<button className="outline-btn" onClick={() => setPage("handover")}><Users size={18} /> View Shift Handover</button>} /><div className="filters-row"><Segments items={["All 24", "Draft 2", "Released 5", "In Progress 9", "Completed 6", "Delayed 2"]} /><Select label="Priority All" /><Select label="Due Date Next 90 Days" /></div><Card title=""><WorkOrderTable /></Card></div><aside className="detail-pane"><div className="pane-head"><h2>WO-2024-05-1256</h2><Badge>In Progress</Badge><X size={22} /></div><p>Electric Hoist Assembly</p><div className="plan-row"><span><small>Due Date</small><b>May 24, 2024</b><em className="red-text">3 days overdue</em></span><span><small>Priority</small><b className="red-text">High</b></span></div><Card title="Job Progress" action={<strong>82%</strong>}><Progress value={82} /></Card><div className="grid two detail-cards"><Card title="Timeline"><SimpleList items={["Released - May 14, 2024", "Job 10 - Cutting - Completed", "Job 20 - Machining - Completed", "Job 30 - Welding - Completed", "Job 40 - Assembly - In Progress", "Job 50 - QA - Pending"]} /></Card><Card title="Linked Machines"><SimpleList items={["CNC Turn 01 82%", "VMC 02 76%", "Drill Press 03 61%", "Weld Cell 02 68%"]} /></Card></div><div className="grid two"><button className="outline-btn danger"><AlertTriangle size={18} /> Delay Risk</button><button className="outline-btn danger"><Bell size={18} /> Related Alerts</button></div><button className="primary wide" onClick={() => setPage("production")}>View Plan</button></aside></section>;
}

function Handover({ setPage }: { setPage: (p: Page) => void }) {
  return <section className="page"><button className="back" onClick={() => setPage("work-orders")}><ChevronLeft size={18} /> Back to Work Orders</button><PageHead title="Shift Handover" desc="Review shift summary, completed work, open items and priorities for seamless handover." actions={<><Select label="All Units" /><Select label="Shift 1 (06:00 AM - 02:00 PM)" /><Select icon={<Calendar size={18} />} label="Today, 20 May 2024" /></>} /><div className="grid six"><StatCard icon={CheckCircle2} title="Completed Jobs" value="18" meta="+12.5% vs yesterday" tone="green" /><StatCard icon={RefreshCcw} title="Carry-forward Jobs" value="7" meta="+2 vs yesterday" tone="orange" /><StatCard icon={ShieldCheck} title="Resolved Alerts" value="11" meta="+10.0% vs yesterday" /><StatCard icon={AlertTriangle} title="Unresolved Alerts" value="3" meta="-1 vs yesterday" tone="red" /><StatCard icon={FileText} title="Machine Notes" value="8" meta="+2 vs yesterday" tone="purple" /><StatCard icon={FlagIcon} title="Next-shift Priorities" value="5" meta="View priorities" /></div><div className="grid three"><Card title="Handover Timeline"><div className="vertical-timeline"><span /><p><b>Submitted by Ramesh Kumar</b><small>Shift 1 (06:00 AM - 02:00 PM)</small></p><p><b>Acknowledged by Amit Sharma</b><small>Shift 2 (02:00 PM - 10:00 PM)</small></p></div></Card><Card title="Alert Summary"><div className="grid three tight"><StatCard icon={AlertTriangle} title="Critical" value="3" meta="Urgent attention" tone="red" /><StatCard icon={Clock3} title="Pending" value="7" meta="Requires action" tone="orange" /><StatCard icon={CheckCircle2} title="Resolved" value="11" meta="Resolved this shift" tone="green" /></div></Card><Card title="Next-shift Priorities"><SimpleList items={["01 Address high energy consumption on CNC Turn 01", "02 Overdue preventive maintenance - Machine H-05", "03 Clear carry-forward job WO-2024-05-1256", "+2 more priorities"]} /></Card></div><div className="grid two"><Card title="Completed Job List"><SimpleTable headers={["Machine", "Part", "Planned qty", "Completed qty"]} rows={["CNC Turn 01|Shaft-AX12|100|100 (100%)", "VMC 02|Housing-HT45|80|80 (100%)", "Drill Press 03|Bracket-BR22|60|60 (100%)", "Surface Grinder 01|Plate-PL10|40|40 (100%)"].map(r => r.split("|"))} /></Card><Card title="Carry-forward List"><SimpleTable headers={["Job", "Machine", "Reason", "Next action"]} rows={["WO-2024-05-1256|CNC Turn 01|Material shortage|Material due by 3:00 PM", "WO-2024-05-1278|VMC 02|Tool change pending|Complete tool setup", "WO-2024-05-1291|Drill Press 03|Interrupted by alert|Resolve alert and resume"].map(r => r.split("|"))} /></Card></div><Card title="Machine Notes"><div className="note-grid">{["CNC Turn 01", "VMC 02", "Drill Press 03", "+5 more notes"].map(x => <div className="note" key={x}><FlagIcon size={24} /><b>{x}</b><small>Minor vibration observed. Running normal.</small></div>)}</div></Card></section>;
}

function Sensors() {
  return <section className="page split-page"><div><PageHead title="Sensor Health" desc="Monitor all sensors, their connection status, signal quality and data health." actions={<><button className="outline-btn"><Download size={18} /> Export</button><button className="primary"><Plus size={18} /> Add Sensor</button></>} /><div className="grid five"><StatCard icon={Radio} title="Connected" value="18" meta="72% of total" tone="green" /><StatCard icon={Activity} title="No Data" value="3" meta="12% of total" tone="orange" /><StatCard icon={Waves} title="Offline" value="4" meta="16% of total" tone="red" /><StatCard icon={Activity} title="Total Sensors" value="25" meta="Across 2 units" tone="purple" /><StatCard icon={Calendar} title="Avg.Data Delay" value="2.4 min" meta="All sensors" /></div><Card title=""><div className="filters-row"><div className="searchbar embedded"><Search size={18} /><input placeholder="Search sensor ID, machine or location..." /></div><Select label="All Units" /><Select label="All Status" /><Select label="All Signal Strength" /><button className="outline-btn"><Filter size={18} /> Filters</button></div><SimpleTable headers={["Sensor ID", "Machine", "Unit", "Status", "Signal", "Last Data", "Current (A)", "Actions"]} rows={sensors.map(r => [...r, "⋮"])} /></Card></div><aside className="detail-pane"><div className="pane-head"><h2>CT-001</h2><Badge tone="green">Connected</Badge><X size={22} /></div><div className="sensor-info"><p><small>Sensor ID</small><b>CT-001</b></p><p><small>Sensor Type</small><b>CT Clamp (100A)</b></p><p><small>Machine</small><b>CNC Turn 01</b></p><p><small>Location</small><b>Main Electrical Panel</b></p><p><small>Unit</small><b>Unit 1</b></p><p><small>Firmware</small><b>v1.2.3</b></p></div><Card title="Live Data"><div className="plan-row"><span><small>Current</small><b>12.4 A</b></span><span><small>Frequency</small><b>50.1 Hz</b></span><span><small>Voltage</small><b>230 V</b></span></div></Card><Card title="Status & Health"><SimpleList items={["Signal Strength Strong (-52 dBm)", "Data Delay 20 sec", "Uptime 99.6%", "Last Reboot 18 May 2024, 02:15 PM"]} /></Card><div className="grid three"><button className="outline-btn">Reassign</button><button className="outline-btn">Calibrate</button><button className="outline-btn danger">Replace</button></div></aside></section>;
}

function Alerts({ openAction }: { openAction: () => void }) {
  return <section className="page split-page"><div><PageHead title="Critical Alerts" desc="" actions={<Badge tone="red">Owner View: Critical & Repeat Only</Badge>} /><div className="filters-row"><Segments items={["Critical downtime 6", "Repeated machine issue 4", "Overcurrent 2", "Extended idle 1", "Delivery-impacting issue 1"]} /></div><div className="filters-row"><Select icon={<Calendar size={18} />} label="Today, 20 May 2024" /><Select label="All Shifts" /><Select label="All Plants" /><Select label="Sort by: Severity (High to Low)" /></div><Card title=""><SimpleTable selectable headers={["Machine / Location", "Alert Type", "Severity", "Duration", "First Detected", "Assigned To", "Status"]} rows={alerts.map(a => [a[0] + "\nPlant 1 · Line A", a[1] + "\n" + a[2], a[3], a[4], a[5] + "\n(22 min ago)", a[6], "Active"])} /></Card></div><aside className="detail-pane alert-detail"><div className="pane-head"><span className="icon-bubble red"><Zap /></span><h2>CNC Turn 01</h2><Badge tone="red">Critical</Badge><X size={22} /></div><p>Plant 1 · Line A</p><div className="grid four tight"><p><small>Duration</small><b>1h 26m</b><em>Ongoing</em></p><p><small>First Detected</small><b>Today, 08:34 AM</b><em>(22 min ago)</em></p><p><small>Occurrences</small><b>3 times</b></p><p><small>Status</small><b>Active</b></p></div><h3>What happened</h3><p>Spindle load exceeded safe threshold (120%). Machine stopped automatically to prevent damage.</p><h3>Machine timeline snapshot</h3><TimelineBars /><h3>Linked Work Order / Job</h3><WorkOrderMini /><h3>Latest Manager / Maintenance Note</h3><div className="note"><b>Ajit More</b><small>Checked spindle motor current. Observed intermittent overload. Inspecting tool holder and lubrication line.</small></div><div className="grid three"><button className="outline-btn">View Machine</button><button className="outline-btn">View Handover</button><button className="primary" onClick={openAction}>Take Action</button></div></aside></section>;
}

function Reports({ setPage }: { setPage: (p: Page) => void }) {
  return <section className="page"><PageHead title="Reports & Analytics" desc="Visualize performance, track trends and drive continuous improvement." actions={<><button className="outline-btn"><FileText size={18} /> CSV</button><button className="outline-btn"><FileText size={18} /> PDF</button></>} /><div className="filters-row"><Segments items={["Today", "Yesterday", "7 Days", "30 Days", "Custom"]} /><Segments items={["All Units", "Single Unit", "Compare Units"]} /></div><div className="grid seven"><StatCard icon={Gauge} title="Plan vs Actual" value="92.3%" meta="View variance" /><StatCard icon={Clock3} title="Downtime Summary" value="156 min" meta="↓ 12.4% previous 30 days" /><StatCard icon={TrendingUp} title="Utilisation Trend" value="81.3%" meta="↑ 3.4% previous 30 days" /><StatCard icon={Zap} title="Energy kWh Trend" value="4,287 kWh" meta="↓ 8.2% previous 30 days" /><StatCard icon={Bell} title="Alert Frequency" value="47" meta="↑ 18.1% previous 30 days" /><StatCard icon={RefreshCcw} title="Repeat Problem Machines" value="3" meta="Needs attention" /><StatCard icon={ShieldCheck} title="Delivery Risk" value="2" meta="Orders at risk" /></div><div className="grid five charts-row"><Card title="Plan vs Actual"><BarChart /></Card><Card title="Downtime by Machine"><MachineBars setPage={setPage} /></Card><Card title="Energy kWh Trend"><LineChart /></Card><Card title="Utilisation Trend"><AreaChart /></Card><Card title="Alerts by Type"><Donut value={47} label="Total" /></Card></div><Card title="Machines Performance Overview"><div className="filters-row"><div className="searchbar embedded"><Search size={18} /><input placeholder="Search machine..." /></div><Select label="Columns" /><Select label="Download" /></div><SimpleTable headers={["Machine", "Utilisation %", "Downtime minutes", "Energy kWh", "Alerts count", "Status trend"]} rows={machines.map(m => [m[0] + "\n" + m[1], `${m[2]}% ↑`, "38 ↓", "842.1 kWh ↑", "12 View alerts", "▁▂▃▂▅▃▆"])} /></Card></section>;
}

function Team() {
  return <section className="page split-page"><div><PageHead title="Team" desc="Manage team members, roles and permissions across your organization." actions={<><button className="outline-btn"><UserPlus size={18} /> Invite Member</button><button className="primary"><Plus size={18} /> Add Member</button></>} /><div className="grid five"><StatCard icon={Users} title="Total Members" value="18" meta="Across 4 roles" /><StatCard icon={CheckCircle2} title="Active Members" value="16" meta="89% of total" tone="green" /><StatCard icon={Clock3} title="Pending Invites" value="2" meta="2 invites sent" tone="orange" /><StatCard icon={UserPlus} title="Inactive Members" value="2" meta="11% of total" tone="red" /><StatCard icon={ShieldCheck} title="Roles" value="4" meta="Owner, Manager, Operator, Maintainer" tone="purple" /></div><Card title=""><div className="filters-row"><div className="searchbar embedded"><Search size={18} /><input placeholder="Search by name, email or role..." /></div><Select label="All Roles" /><Select label="All Status" /><Select label="All Units" /><button className="outline-btn"><Filter size={18} /> Filters</button></div><SimpleTable headers={["Member", "Role", "Unit Access", "Status", "Last Active", "Joined On", "Actions"]} rows={team.map(t => [t[0] + "\n" + t[1], t[2], t[3], t[4], t[5], t[6], "⋮"])} /></Card></div><aside className="detail-pane"><div className="pane-head"><div className="avatar">AS</div><h2>Amit Sharma</h2><Badge tone="green">Active</Badge><X size={22} /></div><p>amit.sharma@acme.com</p><div className="sensor-info single"><p><small>Role</small><b>Manager</b></p><p><small>Phone</small><b>+91 98765 43210</b></p><p><small>Joined On</small><b>14 May 2024</b></p><p><small>Two-Factor Authentication</small><b>Enabled</b></p></div><Card title="Unit Access (3)"><div className="chip-row"><Badge>Unit 1</Badge><Badge>Unit 2</Badge><Badge>Unit 3</Badge></div></Card><Card title="Permissions"><SimpleList items={["View Dashboard", "View & Manage Production", "View & Manage Work Orders", "View Reports", "Manage Machines", "Manage Alerts", "Manage Settings"]} /></Card><div className="grid three"><button className="outline-btn">Reset Password</button><button className="outline-btn danger">Deactivate</button><button className="outline-btn danger">Remove</button></div></aside></section>;
}

function SettingsPage() {
  return <section className="page"><PageHead title="Settings" desc="Manage your organization, preferences, integrations and system settings." /><div className="grid five"><StatCard icon={Factory} title="Organization" value="Alpenklug Industries" meta="View details" /><StatCard icon={ShieldCheck} title="Subscription" value="Professional Plan" meta="Renews on 20 Jun 2024" tone="green" /><StatCard icon={Users} title="Total Users" value="18" meta="Across 4 roles" tone="purple" /><StatCard icon={Radio} title="Total Sensors" value="25" meta="Across 2 units" tone="orange" /><StatCard icon={DatabaseIcon} title="Data Retention" value="365 days" meta="Manage" /></div><div className="settings-grid"><SettingsCard title="Organization Settings" icon={User} items={["Organization Name Alpenklug Industries", "Industry Type Manufacturing", "Time Zone (GMT+05:30) Asia/Kolkata", "Currency INR (₹)", "Date Format DD MMM YYYY", "Fiscal Year Start 1 April", "Language English"]} /><SettingsCard title="Units & Locations" icon={Factory} items={["Total Units 2", "Locations 2", "Unit 1 Alpenklug Plant 1 Active", "Unit 2 Alpenklug Plant 2 Active"]} /><SettingsCard title="Alerts & Notifications" icon={Bell} items={["Email Notifications Enabled", "SMS Notifications Enabled", "Alert Escalation Enabled", "Quiet Hours 10:00 PM - 06:00 AM", "Alert Recipients 8 users"]} /><Card title="Billing & Subscription"><h2>Professional</h2><Badge tone="green">Active</Badge><SimpleList items={["Up to 5 units · Advanced Analytics", "Next Billing Date 20 Jun 2024", "Billing Cycle Monthly"]} /><button className="outline-btn wide">Manage Subscription</button></Card><SettingsCard title="System Preferences" icon={SlidersHorizontal} items={["Default Dashboard Production Overview", "Refresh Interval 30 seconds", "Idle Session Timeout 30 minutes", "Theme Light", "Data Aggregation 1 minute"]} /><SettingsCard title="Integrations" icon={RefreshCcw} items={["Email Service SendGrid Connected", "SMS Service Twilio Connected", "Webhook 1 Endpoint", "API Access Enabled"]} /><SettingsCard title="Data & Security" icon={ShieldCheck} items={["Data Retention 365 days", "Data Backup Daily at 02:00 AM", "Two-Factor Authentication Enabled", "Password Policy Strong", "Login History View logs"]} /><Card title="Support"><SimpleList items={["Email Support support@neolift.app", "Phone Support +91 98765 43210", "Help Center Visit Help Center"]} /><button className="outline-btn wide">Contact Support</button></Card></div></section>;
}

function Card({ title, action, children, className = "" }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{title && <div className="card-head"><h2>{title} <Info size={16} /></h2>{action}</div>}{children}</section>;
}

function Badge({ children, tone = "blue" }: { children: React.ReactNode; tone?: Tone }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function Progress({ value }: { value: number }) {
  return <div className="progress"><span style={{ width: `${value}%` }} /></div>;
}

function Donut({ value, label, icon }: { value: number; label?: string; icon?: React.ReactNode }) {
  return <div className="donut" style={{ "--value": `${value * 3.6}deg` } as React.CSSProperties}>{icon || <><strong>{value || "--"}{value ? "%" : ""}</strong><small>{label}</small></>}</div>;
}

function Legend({ items }: { items: string[][] }) {
  return <div className="legend">{items.map(([a, b, c]) => <span key={a}><i className={`dot ${c}`} />{a}{b && <b>{b}</b>}</span>)}</div>;
}

function EmptyState({ title, text, action }: { title: string; text: string; action?: string }) {
  return <div className="empty"><BarChart3 size={72} /><b>{title}</b><p>{text}</p>{action && <button className="outline-btn">{action}</button>}</div>;
}

function MachineBars({ setPage }: { setPage: (p: Page) => void }) {
  return <div className="bars">{machines.map(([name, code, value, tone]) => <button key={name as string} onClick={() => setPage("machine-detail")}><span><b>{name}</b><small>{code}</small></span><i><em style={{ width: `${value}%` }} /></i><strong>{value}%</strong><span className={`dot ${tone}`} /></button>)}</div>;
}

function LineChart() {
  return <svg className="chart" viewBox="0 0 500 210" role="img"><g className="grid-lines">{[40, 80, 120, 160].map(y => <line key={y} x1="20" x2="480" y1={y} y2={y} />)}</g><polyline points="20,180 55,160 90,150 125,130 160,128 195,108 230,96 265,80 300,90 335,70 370,68 405,62 440,58 480,52" /><polyline className="dashed" points="20,170 55,150 90,148 125,122 160,116 195,98 230,88 265,76 300,50 335,54 370,60 405,65 440,70 480,58" /></svg>;
}

function AreaChart() {
  return <svg className="chart" viewBox="0 0 500 210" role="img"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#17b26a" stopOpacity=".28" /><stop offset="1" stopColor="#17b26a" stopOpacity="0" /></linearGradient></defs><polygon fill="url(#area)" points="20,160 85,120 150,90 215,125 280,84 345,116 410,92 480,78 480,190 20,190" /><polyline className="green-line" points="20,160 85,120 150,90 215,125 280,84 345,116 410,92 480,78" /></svg>;
}

function BarChart() {
  return <div className="bar-chart">{[70, 58, 74, 62, 80, 76].map((v, i) => <div key={i}><span style={{ height: `${v}%` }} /><em style={{ height: `${v - 12}%` }} /><small>{14 + i} May</small></div>)}</div>;
}

function TimelineBars() {
  return <div className="timeline-bars">{["green", "green", "blue", "green", "green", "blue", "red", "green", "blue", "green", "slate"].map((c, i) => <span key={i} className={c} />)}<div className="time-labels"><small>12 AM</small><small>6 AM</small><small>12 PM</small><small>6 PM</small><small>12 AM</small></div></div>;
}

function ShiftSummary({ ready }: { ready: boolean }) {
  return <div className="shift-summary"><Clock3 size={27} /><div><b>Shift 1 Summary</b><small>Auto-surfaces 30 min before shift close</small></div><span>Parts Made <b>{ready ? "1,247" : "--"} units</b></span><span>Downtime <b>{ready ? "38" : "--"} min</b></span><span>Top Downtime <b>{ready ? "Changeover" : "--"}</b></span><span>Energy Used <b>{ready ? "4.7" : "--"} kWh</b></span><button><ShareIcon /></button></div>;
}

function AlertMini({ title, text, tone }: { title: string; text: string; tone: Tone }) {
  return <div className={`alert-mini ${tone}`}><AlertTriangle size={24} /><div><b>{title}</b><p>{text}</p></div><button>Take action</button></div>;
}

function SimpleTable({ headers, rows, selectable = false }: { headers: string[]; rows: string[][]; selectable?: boolean }) {
  return <table className={`data-table ${selectable ? "selectable" : ""}`}><thead><tr>{selectable && <th />} {headers.map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{selectable && <td><span className={`icon-bubble ${i === 6 ? "orange" : "red"}`}><Zap size={18} /></span></td>}{row.map((cell, j) => <td key={j}>{String(cell).split("\n").map((x, k) => k === 0 ? <b key={k}>{x}</b> : <small key={k}>{x}</small>)}</td>)}</tr>)}</tbody></table>;
}

function SimpleList({ items }: { items: string[] }) {
  return <ul className="simple-list">{items.map(item => <li key={item}><span>{item}</span><ChevronRight size={16} /></li>)}</ul>;
}

function JobCard({ text, alert, running }: { text: string; alert?: boolean; running?: boolean }) {
  return <div className={`job-card ${alert ? "danger" : ""}`}><b>{text}</b><small>120 pcs · 4.0 hrs</small><small>Ramesh K.</small>{running && <Badge tone="green">Running</Badge>}{alert && <AlertTriangle size={17} />}</div>;
}

function WorkOrderTable() {
  return <div className="wo-table">{workOrders.map((w, i) => <button key={w[0] as string} className={i === 0 ? "selected" : ""}><span className="radio" /><span><b>{w[0]}</b><small>Electric Hoist Assembly</small></span><span><b>{w[1]}</b><small>{w[2]}</small></span><span><b>{w[3]}</b><small>Units</small></span><span><b>{w[4]}</b><small>{i === 0 ? "3 days" : i + 3 + " days"}</small></span><Badge tone={w[5] === "High" ? "red" : w[5] === "Low" ? "green" : "orange"}>{w[5]}</Badge><Badge>{w[6]}</Badge><span><b>{w[7]}%</b><Progress value={Number(w[7])} /></span><ChevronRight /></button>)}</div>;
}

function WorkOrderMini({ closed }: { closed?: boolean }) {
  return <div className="wo-mini"><h3>{closed ? "WO-2024-05-1183" : "WO-2024-05-1256"}</h3><Badge tone={closed ? "green" : "blue"}>{closed ? "Closed" : "Open"}</Badge><p>{closed ? "Coolant Leak Inspection" : "Tool Wear - Insert Change"}</p><small>{closed ? "Yesterday, 04:30 PM" : "Today, 09:15 AM"}</small></div>;
}

function SettingsCard({ title, icon: Icon, items }: { title: string; icon: any; items: string[] }) {
  return <Card title={title}><SimpleList items={items} /></Card>;
}

function CustomizeModal({ close }: { close: () => void }) {
  const widgets = ["Top Summary Strip", "Key Metrics", "Shift Target vs Actual", "Downtime Minutes", "Energy Consumption Today", "Plant Utilisation", "OEE Summary", "Top 5 Machines by OEE", "Energy Parameters", "Energy vs Plan", "Production Plan", "Alerts & Actions"];
  return <div className="modal-backdrop"><div className="modal large"><button className="modal-close" onClick={close}><X /></button><h2>Customize Dashboard</h2><p>Choose the widgets you want to see and arrange them your way.</p><div className="custom-grid"><div><h3>Available Widgets</h3>{widgets.slice(0, 8).map(w => <div className="widget-row" key={w}><Grid2X2 size={20} /><span><b>{w}</b><small>Drag to add widgets to your dashboard</small></span><Plus size={20} /></div>)}</div><div><h3>Your Dashboard Layout <button className="text-link">Reset to default</button></h3>{widgets.map((w, i) => <div className="layout-row" key={w}><MoveVertical size={17} /><input type="checkbox" checked readOnly /><b>{w}</b><Select label={i < 1 ? "Top" : i < 2 ? "Full Width" : i < 6 ? "Row 1" : i % 2 ? "Right (Large)" : "Left (Large)"} /><Eye size={16} /><Trash2 size={16} /></div>)}</div></div><div className="modal-actions"><button className="outline-btn" onClick={close}>Cancel</button><button className="primary" onClick={close}>Save Layout</button></div></div></div>;
}

function TakeActionModal({ close }: { close: () => void }) {
  return <div className="modal-backdrop dark"><div className="modal action"><button className="modal-close" onClick={close}><X /></button><h2>Take Action</h2><div className="pane-head compact"><span className="icon-bubble red"><Zap /></span><h3>CNC Turn 01</h3><Badge tone="red">Critical</Badge></div><h4>Select Action</h4>{["Acknowledge Alert", "Assign to Team Member", "Create Work Order", "Add Maintenance Note"].map((x, i) => <label className="radio-option" key={x}><input type="radio" name="action" defaultChecked={i === 0} /><span><b>{x}</b><small>{i === 0 ? "I have seen this alert and will monitor." : "Assign this alert for resolution."}</small></span></label>)}<textarea placeholder="Enter notes about the action or issue..." maxLength={250} /><div className="modal-actions"><button className="outline-btn" onClick={close}>Cancel</button><button className="primary" onClick={close}>Confirm Action</button></div></div></div>;
}

function PlayIcon(props: any) { return <span className="css-icon play" {...props} />; }
function PauseIcon(props: any) { return <span className="css-icon pause" {...props} />; }
function StopIcon(props: any) { return <span className="css-icon stop" {...props} />; }
function FlagIcon(props: any) { return <span className="css-icon flag" {...props} />; }
function ShareIcon() { return <span className="css-icon share" />; }
function DatabaseIcon(props: any) { return <span className="css-icon database" {...props} />; }

createRoot(document.getElementById("root")!).render(<App />);
