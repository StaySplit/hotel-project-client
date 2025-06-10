import { userSelector } from "@/atoms/userSelector";
import { useRecoilValueLoadable } from "recoil";

const UserInfo = () => {
  const userLoadable = useRecoilValueLoadable(userSelector);

  if (userLoadable.state === "loading") {
    return <p>로딩 중...</p>;
  }

  if (userLoadable.state === "hasError") {
    return <p>에러 발생: {userLoadable.contents.message}</p>;
  }

  const user = userLoadable.contents;

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center space-y-4 p-4">
      <h2 className="text-4xl font-bold text-black dark:text-white">
        👤 유저 정보
      </h2>
      <p className="font-bold text-black dark:text-white">이름: {user.name}</p>
      <p className="font-bold text-black dark:text-white">
        이메일: {user.email}
      </p>
    </div>
  );
};

export default UserInfo;
