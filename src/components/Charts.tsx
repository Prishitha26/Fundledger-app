import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const COLORS = ['#00355F', '#006A6A', '#0F4C81', '#90EFEF', '#42474F'];

const tooltipStyle = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #E7EEFF',
  borderRadius: '0.75rem',
  fontSize: '0.75rem',
  boxShadow: '0 4px 12px rgba(0,53,95,0.1)',
};

export function MonthlyUtilizationChart({ data }: { data: { month: string; spent: number; allocated: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="spentGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#006A6A" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#006A6A" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="allocGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00355F" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#00355F" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E7EEFF" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#42474F' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#42474F' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}Cr`} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => `₹${v} Cr`} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Area type="monotone" dataKey="allocated" name="Allocated" stroke="#00355F" strokeWidth={2} fill="url(#allocGrad)" />
        <Area type="monotone" dataKey="spent" name="Spent" stroke="#006A6A" strokeWidth={2} fill="url(#spentGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function AllocatedVsSpentChart({ data }: { data: { name: string; allocated: number; spent: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E7EEFF" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#42474F' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: '#42474F' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}Cr`} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => `₹${v} Cr`} cursor={{ fill: '#F0F3FF' }} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="allocated" name="Allocated" fill="#00355F" radius={[4, 4, 0, 0]} />
        <Bar dataKey="spent" name="Spent" fill="#006A6A" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DepartmentDonutChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2}>
          {data.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function StatusPieChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} paddingAngle={2}>
          {data.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function DistrictComparisonChart({ data }: { data: { district: string; allocated: number; spent: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 60, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E7EEFF" horizontal={false} />
        <XAxis type="number" tick={{ fontSize: 12, fill: '#42474F' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}Cr`} />
        <YAxis type="category" dataKey="district" tick={{ fontSize: 12, fill: '#42474F' }} axisLine={false} tickLine={false} width={70} />
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => `₹${v} Cr`} cursor={{ fill: '#F0F3FF' }} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="allocated" name="Allocated" fill="#00355F" radius={[0, 4, 4, 0]} />
        <Bar dataKey="spent" name="Spent" fill="#006A6A" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ExpenditureDonut({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3}>
          {data.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} formatter={(v) => `₹${(Number(v) / 100000).toFixed(1)} L`} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
