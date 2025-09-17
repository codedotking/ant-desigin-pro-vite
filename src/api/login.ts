// 获取验证码
export const getFakeCaptcha = async (params: { phone: string }) => {

  console.log(params);
  // 模拟验证码接口
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
};
