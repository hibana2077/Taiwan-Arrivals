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
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="backdrop-blur-lg bg-white bg-opacity-20 rounded-xl shadow-lg p-6 border border-white border-opacity-30">
          <h1 className="text-3xl font-bold mb-6 text-white text-center">Tourism Data Visualization</h1>
          <div className="bg-white bg-opacity-30 rounded-lg p-4 mb-6">
            <TourismChart data={formattedData} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Tourism', 'Business', 'Family'].map((category) => (
              <div key={category} className="bg-white bg-opacity-30 rounded-lg p-4 text-center">
                <h2 className="text-xl font-semibold text-white mb-2">{category}</h2>
                <p className="text-white text-opacity-80">
                  {formattedData[formattedData.length - 1][category.toLowerCase()].toLocaleString()} visitors
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}