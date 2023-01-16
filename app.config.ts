import { ExpoConfig, ConfigContext } from '@expo/config';
import 'dotenv/config';

export default ({ config }: ConfigContext): Partial<ExpoConfig> => ({
  ...config,
  "android": {
    "package": "com.amarakkk.mobile"
  },
  extra: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    eas: {
      projectId: "b21e557b-aef2-4a59-8e4c-0153d67f9c9b"
    }
  },
});
