# NBA All-Star Voting dApp

A Solana-based decentralized voting application for NBA All-Star player selection using blockchain technology and Solana Actions/Blinks.

## 🏀 Project Overview

This dApp allows users to vote for their favorite NBA All-Star players in a decentralized manner. Built with Next.js, TypeScript, Tailwind CSS, and powered by Solana blockchain for transparent and immutable voting records.

### Features

- **🗳️ Wallet Integration** - Connect Solana wallets for secure voting
- **🏀 NBA Player Cards** - Display detailed player information with images
- **📊 Real-time Voting** - Live vote counting and progress bars
- **🏆 Leader Tracking** - Dynamic leading player display
- **🔗 Solana Actions** - Blockchain-based voting via Blinks
- **📱 Responsive Design** - Works on desktop, tablet, and mobile
- **🎨 Modern UI** - Beautiful gradient designs and smooth animations

### Players Available

1. **Stephen Curry** (PG) - Golden State Warriors
2. **LeBron James** (SF) - Los Angeles Lakers  
3. **Kevin Durant** (SF) - Phoenix Suns
4. **Luka Dončić** (PG) - Dallas Mavericks
5. **Nikola Jokić** (C) - Denver Nuggets

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, DaisyUI
- **Blockchain**: Solana Web3.js, Anchor Framework
- **Wallet**: Solana Wallet Adapter
- **Actions**: Solana Actions/Blinks
- **Build Tool**: Nx Monorepo

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Solana CLI** for local development
- **Anchor CLI** for smart contract deployment

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd project-3-blinks

# Install dependencies
npm install --legacy-peer-deps
```

### 2. Environment Setup

```bash
# Start local Solana validator (for testing)
solana-test-validator

# Set cluster to localhost
solana config set --url localhost
```

### 3. Build and Deploy Smart Contract

```bash
# Navigate to anchor directory
cd anchor

# Build the program
anchor build

# Deploy to local validator
anchor deploy
```

### 4. Start Development Server

```bash
# Return to root directory
cd ..

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔧 Available Scripts

```json
{
  "scripts": {
    "anchor": "nx run anchor:anchor",
    "anchor-build": "nx run anchor:anchor build",
    "anchor-localnet": "nx run anchor:anchor localnet",
    "anchor-test": "nx run anchor:anchor test",
    "build": "nx build web",
    "dev": "nx serve web"
  }
}
```

## 📱 How to Use

### 1. Connect Your Wallet

- Click the wallet connection button in the top navigation
- Select your preferred Solana wallet (Phantom, Solflare, etc.)
- Approve the connection request

### 2. Browse NBA Players

- View the 5 NBA All-Star candidates
- Check their stats: height, weight, college, team
- See current vote counts and percentages

### 3. Cast Your Vote

- **Method 1**: Click "Vote for Player" button (requires wallet connection)
- **Method 2**: Use Solana Action at `/api/vote` endpoint
- **Method 3**: Share the Blink URL with others

### 4. Track Results

- View real-time vote updates
- Monitor the leading player section
- See vote progress bars and percentages

## 🔗 Solana Actions/Blinks

The dApp exposes Solana Actions for voting:

- **Action URL**: `http://localhost:3000/api/vote`
- **Blinks Testing**: Use [dial.to](https://dial.to) to test actions
- **Direct Voting**: Share action URL for easy access

## 🏗️ Project Structure

```
project-3-blinks/
├── anchor/                 # Solana smart contracts
│   ├── programs/          # Anchor programs
│   ├── target/           # Compiled programs
│   └── migrations/        # Deployment scripts
├── web/                  # Next.js frontend
│   ├── app/              # App Router pages
│   │   ├── api/          # API routes
│   │   └── vote/         # Voting action
│   ├── components/        # React components
│   │   ├── dashboard/     # Main voting interface
│   │   ├── account/       # Wallet components
│   │   └── ui/           # UI components
│   ├── services/          # Business logic
│   │   └── nba-service.ts # NBA data service
│   └── public/            # Static assets
│       ├── *.png          # Player images
│       └── favicon.ico
├── package.json           # Dependencies and scripts
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🧪 Testing

### Smart Contract Testing

```bash
# Run anchor tests
cd anchor
anchor test
```

### Frontend Testing

```bash
# Run unit tests
npm test

# Run e2e tests (if configured)
npm run test:e2e
```

## 🌐 Deployment

### Local Development

1. Start local Solana validator
2. Deploy Anchor program locally
3. Update API endpoints to use localhost
4. Run development server

### Production Deployment

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

#### Netlify

```bash
# Build the application
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=.next
```

## 🔐 Security Considerations

- **Wallet Security**: Never share private keys or seed phrases
- **API Security**: All voting actions require wallet signature
- **Smart Contract**: Audited Anchor program with proper access controls
- **Network**: Use HTTPS in production, localhost for development

## 🐛 Troubleshooting

### Common Issues

1. **Wallet Connection Issues**
   - Ensure wallet browser extension is installed
   - Check if wallet is unlocked
   - Try refreshing the page

2. **Build Errors**
   - Run `npm install --legacy-peer-deps`
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

3. **Anchor Program Errors**
   - Ensure local validator is running
   - Check program ID in configuration
   - Verify anchor.toml settings

4. **Vote Not Working**
   - Confirm wallet is connected
   - Check if transaction has sufficient SOL
   - Verify program is deployed

### Getting Help

- Check the [Solana Documentation](https://docs.solana.com/)
- Review [Anchor Guide](https://www.anchor-lang.com/)
- Join [Solana Discord](https://discord.gg/solana)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🙏 Acknowledgments

- [Solana Foundation](https://solana.com/) for the blockchain platform
- [Anchor](https://www.anchor-lang.com/) for the smart contract framework
- [Next.js](https://nextjs.org/) for the React framework
- [NBA](https://www.nba.com/) for player data and inspiration# solar-graduation
# solar-graduation
