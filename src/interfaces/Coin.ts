import { Currency } from '../enums/Currency';
import { Languages } from '../enums/Languages';

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  asset_platform_id: string;
  platforms: Record<string, string>;
  block_time_in_minutes: number;
  hashing_algorithm: string;
  categories: string[];
  public_notice: string;
  additional_notices: string[];
  description: Record<Languages, string>;
  links: Links;
  image: Image;
  country_origin: string;
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  market_cap_rank: number;
  coingecko_rank: number;
  coingecko_score: number;
  developer_score: number;
  community_score: number;
  liquidity_score: number;
  public_interest_score: number;
  market_data: MarketData;
  community_data: CommunityData;
  developer_data: DeveloperData;
  public_interest_stats: PublicInterestStats;
  status_updates: string[];
  last_updated: string;
  tickers: Ticker[];
}

interface Links {
  homepage?: string[];
  blockchain_site?: string[];
  official_forum_url?: string[];
  chat_url?: string[];
  announcement_url?: string[];
  twitter_screen_name?: string;
  facebook_username?: string;
  bitcointalk_thread_identifier?: string;
  telegram_channel_identifier?: string;
  subreddit_url?: string;
  repos_url?: ReposUrl;
}

interface ReposUrl {
  github: string[];
  bitbucket: string[];
}

interface Image {
  thumb: string;
  small: string;
  large: string;
}

interface MarketData {
  current_price: Record<Currency, number>;
  total_value_locked: number;
  mcap_to_tvl_ratio: number;
  fdv_to_tvl_ratio: number;
  roi: number;
  ath: Record<Currency, number>;
  ath_change_percentage: Record<Currency, number>;
  ath_date: Record<Currency, string>;
  atl: Record<Currency, number>;
  atl_change_percentage: Record<Currency, number>;
  atl_date: Record<Currency, string>;
  market_cap: Record<Currency, number>;
  market_cap_rank: number;
  fully_diluted_valuation: Record<Currency, number>;
  total_volume: Record<Currency, number>;
  high_24h: Record<Currency, number>;
  low_24h: Record<Currency, number>;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  price_change_percentage_14d: number;
  price_change_percentage_30d: number;
  price_change_percentage_60d: number;
  price_change_percentage_200d: number;
  price_change_percentage_1y: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  price_change_24h_in_currency: Record<Currency, number>;
  price_change_percentage_1h_in_currency: Record<Currency, number>;
  price_change_percentage_24h_in_currency: Record<Currency, number>;
  price_change_percentage_7d_in_currency: Record<Currency, number>;
  price_change_percentage_14d_in_currency: Record<Currency, number>;
  price_change_percentage_30d_in_currency: Record<Currency, number>;
  price_change_percentage_60d_in_currency: Record<Currency, number>;
  price_change_percentage_200d_in_currency: Record<Currency, number>;
  price_change_percentage_1y_in_currency: Record<Currency, number>;
  market_cap_change_24h_in_currency: Record<Currency, number>;
  market_cap_change_percentage_24h_in_currency: Record<Currency, number>;
  total_supply: number;
  max_supply: number;
  circulating_supply: number;
  last_updated: string;
}

interface CommunityData {
  facebook_likes?: number;
  twitter_followers?: number;
  reddit_average_posts_48h?: number;
  reddit_average_comments_48h?: number;
  reddit_subscribers?: number;
  reddit_accounts_active_48h?: number;
  telegram_channel_user_count?: number;
}

interface DeveloperData {
  forks?: number;
  stars?: number;
  subscribers?: number;
  total_issues?: number;
  closed_issues?: number;
  pull_requests_merged?: number;
  pull_request_contributors?: number;
  code_additions_deletions_4_weeks?: CodeAdditionsDeletions4Weeks;
  commit_count_4_weeks?: number;
  last_4_weeks_commit_activity_series?: number[];
}

interface CodeAdditionsDeletions4Weeks {
  additions: number;
  deletions: number;
}

interface PublicInterestStats {
  alexa_rank: number;
  bing_matches: number;
}

interface Ticker {
  base: string;
  target: string;
  market: Market;
  last: number;
  volume: number;
  converted_last: Record<Currency, number>;
  converted_volume: Record<Currency, number>;
  trust_score: string;
  bid_ask_spread_percentage: number;
  timestamp: string;
  last_traded_at: string;
  last_fetch_at: string;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url?: string;
  token_info_url: number;
  coin_id: string;
  target_coin_id?: string;
}

interface Market {
  name: string;
  identifier: string;
  has_trading_incentive: boolean;
}
