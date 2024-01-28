import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "user",
  storage: localStorage,
  converter: JSON,
});

const userAtom = atom({
  key: "userAtomState",
  default: {
    _id: "",
    address: "",
    email: "",
    isAdmin: false,
    phoneNumber: "",
    username: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export default userAtom;
