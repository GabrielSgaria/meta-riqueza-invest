import axios from 'axios';
import { useState, FormEvent } from 'react';

interface InvestmentFormProps {
  onSubmit: (investment: { category: string; amount: number }) => void;
}

export function InvestmentForm({ onSubmit }: InvestmentFormProps) {
  const [category, setCategory] = useState<string>('crypto');
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios.post('/api/investments/', { category, amount });
    onSubmit({ category, amount });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="crypto">Cripto</option>
        <option value="stocks">Ações</option>
        <option value="fiis">FIIs</option>
        <option value="cdbs">CDBs</option>
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <button type="submit">Adicionar</button>
    </form>
  );
}
