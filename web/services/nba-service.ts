export interface NBAPlayer {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  height: string;
  weight: string;
  jersey_number: string;
  image_url?: string;
  college?: string;
  team: {
    id: number;
    city: string;
    name: string;
    abbreviation: string;
    full_name: string;
  };
}

export interface NBAPlayersResponse {
  data: NBAPlayer[];
  meta: {
    next_cursor?: number;
    per_page: number;
  };
}

class NBAService {
  private apiKey: string | null = null;
  private baseUrl = 'https://api.balldontlie.io/v1';

  // Set API key (call this when you have a key)
  setApiKey(key: string) {
    this.apiKey = key;
  }

  // Get headers for API requests
  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (this.apiKey) {
      headers['Authorization'] = this.apiKey;
    }
    
    return headers;
  }

  // Fetch all players
  async getPlayers(perPage: number = 25): Promise<NBAPlayersResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/players?per_page=${perPage}`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching NBA players:', error);
      throw error;
    }
  }

  // Fetch specific player by ID
  async getPlayer(playerId: number): Promise<{ data: NBAPlayer }> {
    try {
      const response = await fetch(`${this.baseUrl}/players/${playerId}`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching NBA player:', error);
      throw error;
    }
  }

  // Search players by name
  async searchPlayers(search: string, perPage: number = 25): Promise<NBAPlayersResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/players?search=${encodeURIComponent(search)}&per_page=${perPage}`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error searching NBA players:', error);
      throw error;
    }
  }

  // Get hardcoded top NBA All-Star players (fallback when API is not available)
  getTopAllStarPlayers(): NBAPlayer[] {
    return [
      {
        id: 115,
        first_name: "Stephen",
        last_name: "Curry",
        position: "PG",
        height: "6-2",
        weight: "185",
        jersey_number: "30",
        image_url: "/steph.png",
        college: "Davidson",
        team: {
          id: 10,
          city: "Golden State",
          name: "Warriors",
          abbreviation: "GSW",
          full_name: "Golden State Warriors"
        }
      },
      {
        id: 237,
        first_name: "LeBron",
        last_name: "James",
        position: "SF",
        height: "6-9",
        weight: "250",
        jersey_number: "23",
        image_url: "/lebron.png",
        college: "St. Vincent-St. Mary HS (OH)",
        team: {
          id: 14,
          city: "Los Angeles",
          name: "Lakers",
          abbreviation: "LAL",
          full_name: "Los Angeles Lakers"
        }
      },
      {
        id: 220,
        first_name: "Kevin",
        last_name: "Durant",
        position: "SF",
        height: "6-10",
        weight: "240",
        jersey_number: "35",
        image_url: "/kevin_durant.png",
        college: "Texas",
        team: {
          id: 26,
          city: "Phoenix",
          name: "Suns",
          abbreviation: "PHX",
          full_name: "Phoenix Suns"
        }
      },
      {
        id: 220,
        first_name: "Luka",
        last_name: "Dončić",
        position: "PG",
        height: "6-7",
        weight: "230",
        jersey_number: "77",
        image_url: "/luka.png",
        college: "None (International)",
        team: {
          id: 8,
          city: "Dallas",
          name: "Mavericks",
          abbreviation: "DAL",
          full_name: "Dallas Mavericks"
        }
      },
      {
        id: 203,
        first_name: "Nikola",
        last_name: "Jokić",
        position: "C",
        height: "6-11",
        weight: "284",
        jersey_number: "15",
        image_url: "/nikola.png",
        college: "None (International)",
        team: {
          id: 9,
          city: "Denver",
          name: "Nuggets",
          abbreviation: "DEN",
          full_name: "Denver Nuggets"
        }
      }
    ];
  }
}

// Export singleton instance
export const nbaService = new NBAService();
