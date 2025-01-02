import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import toast, { API_ERROR_MESSAGE } from "../lib/toast";
const mutationCache = new MutationCache({
  onError: (error) => {
    console.log(error);
    if (!error) toast.error();
    return error;
  },
  onSuccess: (data) => {
    if (!data?.success && data?.error_message) {
      if (API_ERROR_MESSAGE[data?.error_message]) {
        data.error_message = API_ERROR_MESSAGE[data?.error_message];
      }
      toast.error(
        <div style={{ whiteSpace: "pre-wrap" }}>{data?.error_message}</div>
      );
    }

    return data;
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 0,
    },
  },
  mutationCache,
});

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.REACT_APP_PROJECT_ID;
export const networkId = Number(process.env.REACT_APP_NETWORK_ID || "0");

// 2. Create wagmiConfig
const metadata = {
  name: "Heaven World",
  description:
    "Website to create images from text, images, and swap faces using AI.",
  url: "https://app.stabilityworld.ai", // origin must match your domain & subdomain
  icons: [
    "/static/media/logo.3d81df86662449614e1f38a024618007.svg",
  ],
};
const chains = [networkId === bscTestnet.id ? bscTestnet : bsc];
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  defaultChain: networkId === bscTestnet.id ? bscTestnet : bsc,
  projectId,
  // allowUnsupportedChain: true,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  includeWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
    "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662",
  ],
});

export function Web3ModalProvider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
