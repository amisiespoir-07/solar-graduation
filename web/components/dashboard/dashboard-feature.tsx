'use client';

import { AppHero } from '../ui/ui-layout';
import { nbaService, NBAPlayer } from '@/services/nba-service';
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export default function DashboardFeature() {
  const [players, setPlayers] = useState<NBAPlayer[]>([]);
  const [votes, setVotes] = useState<{ [key: number]: number }>({});
  const { publicKey } = useWallet();

  useEffect(() => {
    // Load top NBA All-Star players
    const topPlayers = nbaService.getTopAllStarPlayers();
    setPlayers(topPlayers);
    
    // Initialize mock vote counts
    const mockVotes: { [key: number]: number } = {};
    topPlayers.forEach((player, index) => {
      mockVotes[player.id] = Math.floor(Math.random() * 100) + 20; // Random votes between 20-120
    });
    setVotes(mockVotes);
  }, []);

  const handleVote = (playerId: number) => {
    if (!publicKey) {
      // Wallet not connected, show message or open wallet modal
      alert('Please connect your wallet to vote!');
      return;
    }
    
    setVotes(prev => ({
      ...prev,
      [playerId]: (prev[playerId] || 0) + 1
    }));
  };

  const getTotalVotes = () => {
    return Object.values(votes).reduce((sum, count) => sum + count, 0);
  };

  const getVotePercentage = (playerId: number) => {
    const total = getTotalVotes();
    if (total === 0) return 0;
    return ((votes[playerId] || 0) / total) * 100;
  };

  const getLeadingPlayer = () => {
    let maxVotes = 0;
    let leadingPlayer: NBAPlayer | null = null;
    
    players.forEach(player => {
      const playerVotes = votes[player.id] || 0;
      if (playerVotes > maxVotes) {
        maxVotes = playerVotes;
        leadingPlayer = player;
      }
    });
    
    return leadingPlayer;
  };

  const isWalletConnected = !!publicKey;

  return (
    <div>
      <AppHero title="NBA All-Star Voting" subtitle="Vote for your favorite NBA player to make the All-Star team!" />
      <div className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Wallet Connection Status */}
        {!isWalletConnected && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h12zm-2 0v10H4V6h8z" />
              </svg>
              <span className="text-yellow-800 font-medium">
                Please connect your wallet to enable voting
              </span>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <div key={player.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              {/* Player Image */}
              <div className="w-full h-48 bg-gray-100">
                {player.image_url && (
                  <img
                    src={player.image_url}
                    alt={`${player.first_name} ${player.last_name}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              {/* Player Info */}
              <div className="p-4">
                <div className="text-center mb-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    {player.first_name} {player.last_name}
                  </h3>
                  <p className="text-lg font-semibold text-blue-600">
                    #{player.jersey_number} • {player.position}
                  </p>
                </div>
                
                {/* Stats */}
                <div className="space-y-1 text-sm text-gray-600 mb-3">
                  <p><strong>Height:</strong> {player.height}</p>
                  <p><strong>Weight:</strong> {player.weight} lbs</p>
                  <p><strong>College:</strong> {player.college}</p>
                  <p><strong>Team:</strong> {player.team.full_name}</p>
                </div>
                
                {/* Current Votes */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Current Votes</span>
                    <span className="font-semibold text-blue-600">{votes[player.id] || 0}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getVotePercentage(player.id)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {getVotePercentage(player.id).toFixed(1)}% of total votes
                  </p>
                </div>
                
                {/* Vote Button */}
                <button
                  onClick={() => handleVote(player.id)}
                  disabled={!isWalletConnected}
                  className={`w-full font-semibold py-2 px-4 rounded-lg transition-colors duration-200 ${
                    isWalletConnected 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isWalletConnected ? 'Vote for Player' : 'Connect Wallet to Vote'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Leading Player Section */}
        {getLeadingPlayer() && (
          <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl p-6 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">🏆 Leading Player</h2>
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0">
                  {getLeadingPlayer()?.image_url && (
                    <img
                      src={getLeadingPlayer()?.image_url}
                      alt={getLeadingPlayer()?.first_name + ' ' + getLeadingPlayer()?.last_name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-bold mb-2">
                    {getLeadingPlayer()?.first_name} {getLeadingPlayer()?.last_name}
                  </h3>
                  <p className="text-xl mb-2">
                    #{getLeadingPlayer()?.jersey_number} • {getLeadingPlayer()?.position} • {getLeadingPlayer()?.team.full_name}
                  </p>
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
                    <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                      <p className="text-sm opacity-90">Total Votes</p>
                      <p className="text-2xl font-bold">{votes[getLeadingPlayer()?.id || 0] || 0}</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                      <p className="text-sm opacity-90">Vote Percentage</p>
                      <p className="text-2xl font-bold">{getVotePercentage(getLeadingPlayer()?.id || 0).toFixed(1)}%</p>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2">
                      <p className="text-sm opacity-90">Total Votes Cast</p>
                      <p className="text-2xl font-bold">{getTotalVotes()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-8 p-4 bg-orange-50 rounded-lg text-center">
          <p className="text-sm text-orange-800">
            <strong>How to vote:</strong> {isWalletConnected 
              ? 'Click "Vote for Player" button or use Solana Action for blockchain voting!' 
              : 'Connect your wallet first to enable voting!'}
          </p>
        </div>
      </div>
    </div>
  );
}
