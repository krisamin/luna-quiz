import styles from "~/styles/luna.module.css";

const Luna = () => {
  return (
    <div className={styles.luna}>
      <div className={styles.brand}>
        <div className={styles.text}>
          <p>달빛을 나누다,</p>
          <p>LUNA.</p>
        </div>
        <div className={styles.line} />
        <div className={styles.logo} />
      </div>
      <p className={styles.introducing}>
        달빛을 나누다, 한국디지털미디어고등학교의 창업동아리 LUNA는{" "}
        <span className={styles.highlight}>IT 기술을 활용</span>하여{" "}
        <span className={styles.highlight}>
          사회적 약자를 돕는 IT 소셜벤처 동아리
        </span>
        로,{" "}
        <span className={styles.highlight}>다양한 사회적 문제들을 해결</span>
        하고{" "}
        <span className={styles.highlight}>모두가 함께 살 수 있는 세상</span>을
        만들기 위해 노력하고 있습니다. LUNA에서는 지금까지{" "}
        <span className={styles.highlight}>60개가 넘는 프로젝트</span>를 통해
        사회적인 가치를 창출해왔으며,{" "}
        <span className={styles.highlight}>77개의 대회</span>를 통해{" "}
        <span className={styles.highlight}>7000만원이 넘는 상금 및 지원금</span>
        을 받았습니다.
      </p>
      <div className={styles.website}>
        <div className={styles.text}>
          <p>지금, 루나 웹사이트에서</p>
          <p>같이 달빛을 나눠보세요!</p>
        </div>
        <div className={styles.line} />
        <a
          className={styles.link}
          href="https://luna.codes"
          target="_blank"
          rel="noreferrer">
          https://luna.codes
        </a>
      </div>
    </div>
  );
};

export default Luna;
