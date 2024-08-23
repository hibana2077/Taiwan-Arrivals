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

  const formatNumber = (number) => {
    return `${(number / 1000).toFixed(1)}K`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="backdrop-blur-lg bg-black bg-opacity-30 rounded-xl shadow-lg p-6 border border-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-gray-100 text-center">Tourism Data Visualization</h1>
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 mb-6">
            <TourismChart data={formattedData} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Tourism', 'Business', 'Family'].map((category) => (
              <div key={category} className="bg-gray-800 bg-opacity-50 rounded-lg p-4 text-center">
                <h2 className="text-xl font-semibold text-gray-100 mb-2">{category}</h2>
                <p className="text-gray-300">
                  {formatNumber(formattedData[formattedData.length - 1][category.toLowerCase()])} visitors
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}