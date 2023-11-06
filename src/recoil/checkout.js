import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "my-checkout",
  storage: localStorage,
  converter: JSON,
});

const checkoutState = atom({
  key: "checkoutStateAtom",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default checkoutState;
