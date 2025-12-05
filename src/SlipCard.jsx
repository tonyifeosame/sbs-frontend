import React from 'react';

const SlipCard = ({ slip }) => {
  const statusClass = slip.status === 'won' ? 'bg-green-50 text-green-700' : slip.status === 'lost' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700';

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      {slip.image_url && (
        <img src={slip.image_url} alt="betslip" className="w-full h-44 object-cover" />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">{slip.platform || 'Platform'}</p>
            <p className="font-semibold text-gray-800 mt-1">{slip.description || 'No description'}</p>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-semibold ${statusClass}`}>{(slip.status || 'pending').toUpperCase()}</div>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1"><span className="font-semibold text-gray-800">{slip.total_odds ?? '—'}</span><span className="text-xs text-gray-400">x</span></div>
            <div className="text-xs">Stake: ₦{slip.stake_amount ?? '—'}</div>
            <div className="text-xs">Code: {slip.betslip_code || '—'}</div>
          </div>
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <div>❤️ 0</div>
            <div>💬 0</div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SlipCard;
