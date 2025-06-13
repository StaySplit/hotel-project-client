

const UserInfo = () => {

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center space-y-4 p-4">
      <h2 className="text-4xl font-bold text-black dark:text-white">
        👤 유저 정보
      </h2>
      <p className="font-bold text-black dark:text-white">이름: 홍길동</p>
      <p className="font-bold text-black dark:text-white">
        이메일: 이메일@naver.com
      </p>
    </div>
  );
};

export default UserInfo;
