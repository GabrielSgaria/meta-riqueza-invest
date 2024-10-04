import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Investment {
    category: string;
    amount: number;
  }
 
  interface DashboardProps {
    investments: Investment[];
  }
  
export function Dashboard({ investments }: DashboardProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={investments}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
