import React, { useState } from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { LineChartOutlined, BankOutlined } from '@ant-design/icons';
import { PieChart, Pie, Sector, ResponsiveContainer, Tooltip, LineChart, Line, CartesianGrid, XAxis, YAxis, Cell } from 'recharts';

const cardStyle = {
  border: '2px solid rgba(196, 0, 62, 1)',
  borderRadius: 8,
};

// Dados fictícios para os gráficos
const orgAtivasPieData = [
  { name: 'Ativas', value: 215, color: 'rgba(196, 0, 62, 1)' },
  { name: 'Inativos', value: 35, color: 'hsl(59, 100.00%, 38.40%)' },
];
const inadimplentesPieData = [
  { name: 'Inadimplentes', value: 25, color: '#96002F' },
  { name: 'Adimplentes', value: 190, color: 'hsl(59, 100.00%, 38.40%)' },
];
const acessosData = [
  { name: '08:00', value: 200 },
  { name: '09:00', value: 250 },
  { name: '10:00', value: 300 },
  { name: '11:00', value: 321 },
  { name: '12:00', value: 310 },
];

function renderActiveShape(props: any) {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill} fontWeight={700} fontSize={16}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{value}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {(percent * 100).toFixed(0)}%
      </text>
    </g>
  );
}

const DashboardSummary: React.FC = () => {
  const [activeIndexAtivas, setActiveIndexAtivas] = useState(0);
  const [activeIndexInadimplentes, setActiveIndexInadimplentes] = useState(0);

  return (
    <Row gutter={16} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} md={8}>
        <Card style={cardStyle}>
          <Statistic
            title="Organizações Ativas"
            value={215}
            prefix={<BankOutlined />}
          />
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              {/* @ts-expect-error Recharts Pie type issue */}
              <Pie
                activeIndex={activeIndexAtivas}
                activeShape={renderActiveShape}
                data={orgAtivasPieData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={45}
                dataKey="value"
                onMouseEnter={(_: any, idx: number) => setActiveIndexAtivas(idx)}
                fill={orgAtivasPieData[0].color}
              >
                {orgAtivasPieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card style={cardStyle}>
          <Statistic
            title="Organizações Inadimplentes"
            value={25}
            prefix={<BankOutlined />}
          />
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie
                activeIndex={activeIndexInadimplentes}
                activeShape={renderActiveShape}
                data={inadimplentesPieData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={45}
                dataKey="value"
                onMouseEnter={(_: any, idx: number) => setActiveIndexInadimplentes(idx)}
                fill={inadimplentesPieData[0].color}
              >
                {inadimplentesPieData.map((entry, idx) => (
                  <Cell key={`cell-inadimplente-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card style={cardStyle}>
          <Statistic
            title="Acessos ao Associatec Hoje"
            value={321}
            prefix={<LineChartOutlined />}
          />
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={acessosData} style={{ marginTop: 40 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#96002F" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardSummary; 