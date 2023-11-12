type GetKakaoProfile = (token: string) => Promise<{
  id: number;
  nickname: string;
  profileImage: string;
}>;
export const getKakaoProfile: GetKakaoProfile = async (token) => {
  const response = await fetch("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return {
    id: data.id,
    nickname: data.properties.nickname,
    profileImage: data.properties.profile_image,
  };
};
