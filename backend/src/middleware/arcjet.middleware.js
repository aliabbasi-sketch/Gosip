import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Too many Requests" });
            }
            else if (decision.reason.isBot()) {
                return res.status(403).json({ message: "Bot access denied" });
            }
            else {
                return res.status(403).json({ message: "Access denied by security protocol" });
            }
        }

        // chekc for spoofed bot thin
        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json(
                {
                    error: "Spoofed Bot detected",
                    message: "Malicious activity detected"
                }
            );
        }

        // console.log(decision)
        // if every verification psses
        next();

    } catch (error) {
        console.log("Arcjet Protection Error", error);
        next();
    }
}