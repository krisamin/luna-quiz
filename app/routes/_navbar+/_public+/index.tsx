import styles from "~/styles/main.module.css";

const Main = () => {
  return (
    <div className={styles.main}>
      <div className={styles.welcome}>
        <p>LUNA와 함께</p>
        <p>게임으로,</p>
        <p>문해력을 키워봐요!</p>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>
          <p>그런데,</p>
          <p>
            왜 우리가 <span className={styles.highlight}>문해력</span>을
            키워야하나요?
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.title}>왜 문해력인가?</p>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>
          <p>퀴즈 순위</p>
          <p>
            문해력 퀴즈 <span className={styles.highlight}>1등에 도전</span>
            해보세요!
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.title}>문해력 퀴즈 리더보드</p>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>
          <p>펀딩 후원자 명단</p>
          <p>
            후원해주셔서 <span className={styles.highlight}>감사합니다!</span>
          </p>
        </div>
        <div className={styles.card}>
          <p className={styles.title}>후원자 명단</p>
        </div>
      </div>
      <div className={styles.try}>
        <div className={styles.text}>
          <p>지금, 루나와 함께, 재밌게</p>
          <p>문해력 상승에 도전하세요!</p>
        </div>
        <div className={styles.arrow}>
          <div className={styles.head} />
        </div>
      </div>
    </div>
  );
};

export default Main;
