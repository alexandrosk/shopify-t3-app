import { NavigationMenu } from "@shopify/app-bridge-react";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import AppBridgeProvider from "@/components/providers/AppBridgeProvider";
import TrpcProvider from '@/components/providers/TrpcProvider';

export default function App({ Component, pageProps }) {
  return (
    <PolarisProvider i18n={translations}>
      <AppBridgeProvider>
        <TrpcProvider>
            <NavigationMenu
              navigationLinks={[
                {
                  label: "Fetch Data",
                  destination: "/debug/getData",
                },
                {
                  label: "Billing API",
                  destination: "/debug/billing",
                },
              ]}
            />
            <Component {...pageProps} />
        </TrpcProvider>
      </AppBridgeProvider>
    </PolarisProvider>
  );
}
