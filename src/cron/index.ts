import { CronJob } from "cron";
import { cron_update_latest_block } from "./cron.update_latest_block";
import { LIST_CONTRACT } from "../config";
import { cron_update_event } from "./cron.consume_event";

const cronService = {
	blockChain: () => {
		cron_update_latest_block();
		cron_update_event(LIST_CONTRACT);
	},
};

// rome-ignore lint/nursery/noBannedTypes: <explanation>
export const InitCron = (cron_time: string, call_back: Function) => {
	return new CronJob(
		cron_time,
		async () => {
			try {
				console.log(`Start ${call_back.name || "TestCron"}:`, new Date());
				await call_back();
			} catch (error) {
				console.log(`${call_back.name || "TestCron"}`, error);
			} finally {
				console.log(
					`${call_back.name || "TestCron"} running complete:`,
					new Date(),
				);
			}
		},
		null,
		true,
		"UTC",
	);
};

export { cronService };
