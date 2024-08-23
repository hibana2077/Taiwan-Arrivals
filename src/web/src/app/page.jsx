import TourismChart from '@/components/TourismChart';

async function getData() {
  const res = await fetch('http://backend:8081/data', { cache: 'no-store' });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}

export default async function Page() {
  const jsonData = await getData();
  
  const formattedData = Object.keys(jsonData['年度']).map(key => ({
    year: jsonData['年度'][key],
    tourism: parseInt(jsonData['總計觀光'][key], 10),
    business: jsonData['總計業務'][key],
    family: jsonData['總計探親'][key],
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Tourism Data Visualization</h1>
      <TourismChart data={formattedData} />
    </div>
  );
}