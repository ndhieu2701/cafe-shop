import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "product-cart",
  storage: localStorage,
  converter: JSON,
});

const cartState = atom({
  key: "cartAtomState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default cartState;
