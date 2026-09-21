import { Plugin } from 'vue';
import { AuthGuard } from './guard';
export declare function runApp(plugins?: Plugin[], opts?: {
    getAuthGuard: () => AuthGuard;
}): Promise<void>;
