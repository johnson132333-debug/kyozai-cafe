// サイト全体で使う教材・学年・教科アイコン。
// 絵文字はOS/ブラウザごとに見た目が大きく変わる（学校のChromebookとの相性も含め）ため、
// すべてインラインSVGの線画アイコンに統一している。stroke="currentColor" にしているので、
// 呼び出し側の text-color クラス（GRADE_STYLES / SUBJECT_STYLES）にそのまま同化する。
import type { ReactNode } from "react";

type IconProps = { className?: string };

function IconBase({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// ---------------- 学年アイコン ----------------

function NumberBadge({ n, className }: { n: number; className?: string }) {
  return (
    <IconBase className={className}>
      <circle cx="20" cy="20" r="15" />
      <text
        x="20"
        y="26"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        stroke="none"
        fill="currentColor"
      >
        {n}
      </text>
    </IconBase>
  );
}

function GradCap({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M20 12 L36 18 L20 24 L4 18 Z" strokeLinejoin="round" />
      <path d="M11 21 V29 C11 31 15 33 20 33 C25 33 29 31 29 29 V21" />
      <path d="M34 18 V27" />
    </IconBase>
  );
}

function RainbowStar({ className }: IconProps) {
  return (
    <IconBase className={className}>
      <path d="M6 24 A14 14 0 0 1 34 24" />
      <path d="M11 24 A9 9 0 0 1 29 24" strokeOpacity="0.55" />
      <path d="M20 27 L22.3 32 L28 32.6 L23.7 36.2 L25 41.8 L20 38.8 L15 41.8 L16.3 36.2 L12 32.6 L17.7 32 Z" transform="translate(0,-4)" />
    </IconBase>
  );
}

const GRADE_ICON_MAP: Record<string, (props: IconProps) => ReactNode> = {
  小学1年: (p) => <NumberBadge n={1} {...p} />,
  小学2年: (p) => <NumberBadge n={2} {...p} />,
  小学3年: (p) => <NumberBadge n={3} {...p} />,
  小学4年: (p) => <NumberBadge n={4} {...p} />,
  小学5年: (p) => <NumberBadge n={5} {...p} />,
  小学6年: (p) => <NumberBadge n={6} {...p} />,
  中学1年: (p) => <GradCap {...p} />,
  全学年: (p) => <RainbowStar {...p} />,
};

export function GradeIcon({ grade, className }: { grade: string; className?: string }) {
  const render = GRADE_ICON_MAP[grade];
  if (render) return <>{render({ className })}</>;
  return <RainbowStar className={className} />;
}

// ---------------- 教科アイコン ----------------

function IconAbacus(p: IconProps) {
  return (
    <IconBase {...p}>
      <rect x="6" y="8" width="28" height="24" rx="3" />
      <line x1="6" y1="16" x2="34" y2="16" />
      <line x1="6" y1="24" x2="34" y2="24" />
      <circle cx="14" cy="16" r="2" fill="currentColor" stroke="none" />
      <circle cx="22" cy="16" r="2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="24" r="2" fill="currentColor" stroke="none" />
      <circle cx="27" cy="24" r="2" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

function IconBookOpen(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M20 12 C17 9 11 8 6 9 V29 C11 28 17 29 20 32 C23 29 29 28 34 29 V9 C29 8 23 9 20 12 Z" />
      <line x1="20" y1="12" x2="20" y2="32" />
    </IconBase>
  );
}

function IconSprout(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M20 32 V20" />
      <path d="M20 20 C20 13 14 11 9 11 C9 17 13 21 20 21" />
      <path d="M20 24 C20 18 26 16 31 16 C31 21 27 25 20 25" />
      <path d="M12 32 H28" />
    </IconBase>
  );
}

function IconGlobe(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="20" cy="20" r="14" />
      <ellipse cx="20" cy="20" rx="6" ry="14" />
      <line x1="6" y1="20" x2="34" y2="20" />
      <path d="M8.5 12.5 C13 15 27 15 31.5 12.5" />
      <path d="M8.5 27.5 C13 25 27 25 31.5 27.5" />
    </IconBase>
  );
}

function IconFlask(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M16 7 H24" />
      <path d="M17.5 7 V16 L9 30 C8 32 9.5 34 12 34 H28 C30.5 34 32 32 31 30 L22.5 16 V7" />
      <line x1="14" y1="24" x2="26" y2="24" />
    </IconBase>
  );
}

function IconSpeechGlobe(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M6 10 H34 V26 H16 L10 32 V26 H6 Z" strokeLinejoin="round" />
      <path d="M12 18 C12 14 16 13 20 13 C24 13 28 14 28 18 C28 22 24 23 20 23 C16 23 12 22 12 18 Z" strokeOpacity="0.5" />
    </IconBase>
  );
}

function IconClipboard(p: IconProps) {
  return (
    <IconBase {...p}>
      <rect x="9" y="8" width="22" height="27" rx="3" />
      <rect x="15" y="6" width="10" height="5" rx="1.5" />
      <line x1="14" y1="18" x2="26" y2="18" />
      <line x1="14" y1="24" x2="26" y2="24" />
      <line x1="14" y1="30" x2="22" y2="30" />
    </IconBase>
  );
}

function IconHeartHands(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M20 32 C10 25 6 19 6 14 C6 9.5 10 7 13.5 8.5 C16.5 9.8 19 13 20 15 C21 13 23.5 9.8 26.5 8.5 C30 7 34 9.5 34 14 C34 19 30 25 20 32 Z" />
    </IconBase>
  );
}

const SUBJECT_ICON_MAP: Record<string, (props: IconProps) => ReactNode> = {
  算数: IconAbacus,
  国語: IconBookOpen,
  生活科: IconSprout,
  社会: IconGlobe,
  理科: IconFlask,
  英語: IconSpeechGlobe,
  学級経営: IconClipboard,
  特別支援: IconHeartHands,
};

export function SubjectIcon({ subject, className }: { subject: string; className?: string }) {
  const Render = SUBJECT_ICON_MAP[subject];
  if (Render) return <>{Render({ className })}</>;
  return <RainbowStar className={className} />;
}

// ---------------- 教材（個別）アイコン ----------------
// 概念が近い教材は絵文字時代と同じくアイコンも使い回している
// （分数系5つ→ピザ、英単語系3つ→単語カード、水の三態2つ→しずく、漢字2つ→文字カード）。

function IconMultiplyBadge(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="20" cy="20" r="15" />
      <line x1="15" y1="15" x2="25" y2="25" />
      <line x1="25" y1="15" x2="15" y2="25" />
    </IconBase>
  );
}

function IconMapPin(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M20 35 C20 35 10 24 10 16 C10 9.5 14.5 5 20 5 C25.5 5 30 9.5 30 16 C30 24 20 35 20 35 Z" />
      <circle cx="20" cy="16" r="4.5" />
    </IconBase>
  );
}

function IconPizzaSlice(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M20 20 L20 5 A15 15 0 0 1 33 27.5 Z" fill="currentColor" fillOpacity="0.18" />
      <circle cx="20" cy="20" r="15" />
      <line x1="20" y1="20" x2="20" y2="5" />
      <line x1="20" y1="20" x2="33" y2="27.5" />
    </IconBase>
  );
}

function IconCharacterCard(p: IconProps) {
  return (
    <IconBase {...p}>
      <rect x="7" y="6" width="26" height="28" rx="3" />
      <line x1="14" y1="14" x2="26" y2="14" />
      <line x1="20" y1="10" x2="20" y2="30" />
      <path d="M14 24 C16 27 20 28 26 26" />
    </IconBase>
  );
}

function IconFlashcard(p: IconProps) {
  return (
    <IconBase {...p}>
      <rect x="10" y="11" width="24" height="17" rx="2.5" transform="rotate(-6 22 19)" strokeOpacity="0.45" />
      <rect x="6" y="13" width="24" height="17" rx="2.5" />
      <line x1="11" y1="18" x2="19" y2="18" />
      <line x1="11" y1="23" x2="25" y2="23" />
    </IconBase>
  );
}

function IconDroplet(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M20 5 C26 15 32 21 32 26.5 C32 32.5 26.6 36 20 36 C13.4 36 8 32.5 8 26.5 C8 21 14 15 20 5 Z" />
    </IconBase>
  );
}

function IconCalendarCheck(p: IconProps) {
  return (
    <IconBase {...p}>
      <rect x="6" y="9" width="28" height="24" rx="3" />
      <line x1="6" y1="16" x2="34" y2="16" />
      <line x1="13" y1="5" x2="13" y2="12" />
      <line x1="27" y1="5" x2="27" y2="12" />
      <path d="M13 24 L18 29 L28 20" />
    </IconBase>
  );
}

function IconHourglass(p: IconProps) {
  return (
    <IconBase {...p}>
      <line x1="9" y1="6" x2="31" y2="6" />
      <line x1="9" y1="34" x2="31" y2="34" />
      <path d="M11 6 C11 15 20 18 20 20 C20 18 29 15 29 6" />
      <path d="M11 34 C11 25 20 22 20 20 C20 22 29 25 29 34" />
    </IconBase>
  );
}

function IconFaceHeart(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="17" cy="18" r="12" />
      <circle cx="13" cy="16" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="21" cy="16" r="1.4" fill="currentColor" stroke="none" />
      <path d="M11 22 C13.5 25 20.5 25 23 22" />
      <path d="M27 26 C24 24 22.5 21 24 18.5 C25.2 16.6 28 16.9 28.5 19 C29 16.9 31.8 16.6 33 18.5 C34.5 21 33 24 30 26 C29 26.7 28 27.2 27 26 Z" />
    </IconBase>
  );
}

function IconFaceQuiz(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="18" cy="20" r="13" />
      <circle cx="14" cy="18" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="22" cy="18" r="1.5" fill="currentColor" stroke="none" />
      <path d="M13.5 25 Q18 22 22.5 25" />
      <path d="M29 8 C33 8 34 12 31 14 C29.3 15.1 29 16 29 17.5" strokeLinecap="round" />
      <circle cx="29" cy="21.5" r="0.8" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

function IconEye(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M4 20 C9 11 31 11 36 20 C31 29 9 29 4 20 Z" />
      <circle cx="20" cy="20" r="5.5" />
      <circle cx="20" cy="20" r="1.5" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

function IconMagnifyNumbers(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="17" cy="17" r="10" />
      <line x1="24.5" y1="24.5" x2="34" y2="34" />
      <text x="17" y="21" textAnchor="middle" fontSize="11" fontWeight="700" stroke="none" fill="currentColor">
        12
      </text>
    </IconBase>
  );
}

function IconShapeCluster(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M12 6 L18 16 H6 Z" strokeLinejoin="round" />
      <circle cx="27" cy="12" r="6" />
      <rect x="16" y="22" width="14" height="12" rx="2" />
    </IconBase>
  );
}

function IconStoryBook(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M20 12 C17 9 11 8 6 9 V29 C11 28 17 29 20 32 C23 29 29 28 34 29 V9 C29 8 23 9 20 12 Z" />
      <line x1="20" y1="12" x2="20" y2="32" />
      <path
        d="M20 20.5 C18 18 16 18.3 16 20.2 C16 21.8 18 23 20 24.8 C22 23 24 21.8 24 20.2 C24 18.3 22 18 20 20.5 Z"
        fill="currentColor"
        fillOpacity="0.5"
        stroke="none"
      />
    </IconBase>
  );
}

function IconTurnArrows(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M9 15 A11 11 0 0 1 29 10" />
      <path d="M29 10 L30 16 L24 14" />
      <path d="M31 25 A11 11 0 0 1 11 30" />
      <path d="M11 30 L10 24 L16 26" />
    </IconBase>
  );
}

function IconRuler(p: IconProps) {
  return (
    <IconBase {...p}>
      <rect x="5" y="15" width="30" height="10" rx="2" transform="rotate(-8 20 20)" />
      <line x1="11" y1="16" x2="11" y2="20" transform="rotate(-8 20 20)" />
      <line x1="17" y1="16" x2="17" y2="21" transform="rotate(-8 20 20)" />
      <line x1="23" y1="15" x2="23" y2="20" transform="rotate(-8 20 20)" />
      <line x1="29" y1="15" x2="29" y2="21" transform="rotate(-8 20 20)" />
    </IconBase>
  );
}

function IconGroupsRemainder(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="10" cy="13" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="18" cy="13" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="14" cy="19" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="27" cy="13" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="35" cy="13" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="31" cy="19" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="20" cy="30" r="2.6" fill="currentColor" fillOpacity="0.4" stroke="none" />
      <path d="M4 22 H24" strokeDasharray="2 3" />
    </IconBase>
  );
}

function IconBarPercent(p: IconProps) {
  return (
    <IconBase {...p}>
      <line x1="9" y1="34" x2="9" y2="20" />
      <line x1="18" y1="34" x2="18" y2="12" />
      <line x1="27" y1="34" x2="27" y2="24" />
      <line x1="4" y1="34" x2="34" y2="34" />
      <circle cx="30" cy="8" r="2.3" />
      <circle cx="36" cy="14" r="2.3" />
      <line x1="32.5" y1="6" x2="33.5" y2="16" strokeOpacity="0" />
      <line x1="27" y1="17" x2="39" y2="5" />
    </IconBase>
  );
}

function IconFlowerSunflower(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="20" cy="14" r="5" fill="currentColor" fillOpacity="0.25" />
      <circle cx="20" cy="14" r="5" />
      <path d="M20 9 V4 M25 11 L28.5 7.5 M15 11 L11.5 7.5 M14.5 17 L10 19 M25.5 17 L30 19" />
      <path d="M20 19 V34" />
      <path d="M20 26 C20 22 15 21 12 22" />
      <path d="M20 30 C20 27 25 26 28 27" />
    </IconBase>
  );
}

function IconMorningGlory(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M20 6 C26 6 30 11 30 16 C30 22 25 25 20 30 C15 25 10 22 10 16 C10 11 14 6 20 6 Z" />
      <path d="M20 30 V34" />
      <path d="M20 34 C16 34 13 32 12 34" />
      <circle cx="20" cy="16" r="2.6" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

function IconBulbCircuit(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="20" cy="15" r="10" />
      <path d="M16 24 H24 V28 C24 30 22.5 31 20 31 C17.5 31 16 30 16 28 Z" />
      <line x1="17" y1="31" x2="17" y2="34" />
      <line x1="23" y1="31" x2="23" y2="34" />
      <path d="M16 15 L18.5 11 L21 17 L23.5 13" />
    </IconBase>
  );
}

function IconSunCloud(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="26" cy="12" r="6" />
      <line x1="26" y1="2" x2="26" y2="4.5" />
      <line x1="35" y1="12" x2="32.5" y2="12" />
      <line x1="32.4" y1="18.4" x2="30.6" y2="16.6" />
      <path d="M8 30 C4 30 4 23 10 23 C10.5 18.5 18 18 19.5 22.5 C25 21.5 26 28 22 30 Z" />
    </IconBase>
  );
}

function IconTrapezoidShape(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M12 12 H28 L34 30 H6 Z" strokeLinejoin="round" />
    </IconBase>
  );
}

function IconParallelogramShape(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M13 10 H33 L27 30 H7 Z" strokeLinejoin="round" />
    </IconBase>
  );
}

function IconTriangleShape(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M20 7 L34 32 H6 Z" strokeLinejoin="round" />
    </IconBase>
  );
}

function IconPentagonAngles(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M20 5 L35 16 L29 33 H11 L5 16 Z" strokeLinejoin="round" />
      <path d="M20 5 L29 33 M20 5 L11 33 M20 5 L5 16 M20 5 L35 16" strokeOpacity="0.5" />
    </IconBase>
  );
}

function IconCirclePie(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="20" cy="20" r="15" />
      <path d="M20 20 L20 5 A15 15 0 0 1 33 27.5 Z" fill="currentColor" fillOpacity="0.2" stroke="none" />
      <line x1="20" y1="20" x2="20" y2="5" />
      <line x1="20" y1="20" x2="33" y2="27.5" />
      <line x1="20" y1="20" x2="7" y2="27.5" />
    </IconBase>
  );
}

function IconTenFrame(p: IconProps) {
  return (
    <IconBase {...p}>
      <rect x="5" y="11" width="30" height="18" rx="2" />
      <line x1="14" y1="11" x2="14" y2="29" />
      <line x1="20" y1="11" x2="20" y2="29" />
      <line x1="26" y1="11" x2="26" y2="29" />
      <line x1="5" y1="20" x2="35" y2="20" />
      <circle cx="9.5" cy="15.5" r="2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="15.5" r="2" fill="currentColor" stroke="none" />
      <circle cx="23" cy="15.5" r="2" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="24.5" r="2" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

function IconPlusMinusBadge(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="20" cy="20" r="15" />
      <line x1="14" y1="16" x2="20" y2="16" />
      <line x1="17" y1="13" x2="17" y2="19" />
      <line x1="21" y1="25" x2="27" y2="25" />
    </IconBase>
  );
}

function IconClockFace(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="20" cy="20" r="15" />
      <line x1="20" y1="20" x2="20" y2="10" />
      <line x1="20" y1="20" x2="27" y2="23" />
      <circle cx="20" cy="20" r="1.4" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

function IconHiraganaCard(p: IconProps) {
  return (
    <IconBase {...p}>
      <rect x="7" y="6" width="26" height="28" rx="3" />
      <path d="M14 15 C14 12 26 12 26 15 C26 18 14 17 14 20 C14 24 26 22 26 27" />
    </IconBase>
  );
}

function IconRomajiConvert(p: IconProps) {
  return (
    <IconBase {...p}>
      <rect x="4" y="9" width="12" height="12" rx="2" />
      <text x="10" y="18.5" textAnchor="middle" fontSize="8.5" fontWeight="700" stroke="none" fill="currentColor">
        A
      </text>
      <path d="M18 15 H26" />
      <path d="M23.5 11.5 L27 15 L23.5 18.5" />
      <path
        d="M32 12 C32 10 36 10 36 12 C36 14 32 13.3 32 15.5 C32 18 36 17 36 19.5"
        transform="translate(-3,0)"
      />
      <rect x="26" y="24" width="10" height="10" rx="2" strokeOpacity="0.6" />
    </IconBase>
  );
}

function IconSentenceUnderline(p: IconProps) {
  return (
    <IconBase {...p}>
      <line x1="6" y1="12" x2="34" y2="12" />
      <line x1="6" y1="20" x2="26" y2="20" />
      <line x1="6" y1="28" x2="30" y2="28" />
      <line x1="6" y1="31.5" x2="18" y2="31.5" strokeWidth="3.2" strokeOpacity="0.5" />
    </IconBase>
  );
}

function IconScroll(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M10 8 C7 8 7 14 10 14 H30 C33 14 33 8 30 8 Z" />
      <path d="M10 26 C7 26 7 32 10 32 H30 C33 32 33 26 30 26 Z" />
      <line x1="10" y1="11" x2="10" y2="29" />
      <line x1="30" y1="11" x2="30" y2="29" />
      <line x1="15" y1="20" x2="25" y2="20" />
    </IconBase>
  );
}

function IconBowPerson(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="14" cy="10" r="4.5" />
      <path d="M11 15 C8 18 8 24 12 27 L18 22 C21 20 22 26 26 29" />
      <line x1="12" y1="27" x2="9" y2="34" />
      <line x1="18" y1="22" x2="22" y2="30" />
    </IconBase>
  );
}

function IconCakeCandle(p: IconProps) {
  return (
    <IconBase {...p}>
      <rect x="8" y="20" width="24" height="13" rx="2" />
      <path d="M8 24 C11 22 14 26 17 24 C20 22 23 26 26 24 C29 22 32 24 32 24" />
      <line x1="20" y1="20" x2="20" y2="13" />
      <path d="M20 13 C18.5 11 18.5 8.5 20 6 C21.5 8.5 21.5 11 20 13 Z" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

function IconSignpost(p: IconProps) {
  return (
    <IconBase {...p}>
      <line x1="14" y1="35" x2="14" y2="10" />
      <path d="M14 12 H30 L26 17 L30 22 H14" strokeLinejoin="round" />
      <path d="M14 27 H2 L6 23 M2 27 L6 31" strokeLinejoin="round" />
    </IconBase>
  );
}

function IconSunUmbrella(p: IconProps) {
  return (
    <IconBase {...p}>
      <circle cx="30" cy="9" r="4" />
      <path d="M6 20 C6 12 34 12 34 20 Z" />
      <line x1="20" y1="20" x2="20" y2="34" />
      <path d="M20 34 C20 31 24 31 24 34" />
    </IconBase>
  );
}

function IconStarShine(p: IconProps) {
  return (
    <IconBase {...p}>
      <path d="M20 6 L23.5 16.5 L34 16.5 L25.5 23 L28.5 33.5 L20 27 L11.5 33.5 L14.5 23 L6 16.5 L16.5 16.5 Z" strokeLinejoin="round" />
    </IconBase>
  );
}

function IconStarRating(p: IconProps) {
  const star = (cx: number) =>
    `M${cx} 15 L${cx + 2.1} 20.3 L${cx + 7.8} 20.8 L${cx + 3.4} 24.6 L${cx + 4.8} 30.2 L${cx} 27 L${cx - 4.8} 30.2 L${cx - 3.4} 24.6 L${cx - 7.8} 20.8 L${cx - 2.1} 20.3 Z`;
  return (
    <IconBase {...p}>
      <path d={star(9)} fill="currentColor" fillOpacity="0.85" stroke="none" />
      <path d={star(20)} fill="currentColor" fillOpacity="0.85" stroke="none" />
      <path d={star(31)} fill="currentColor" fillOpacity="0.85" stroke="none" />
    </IconBase>
  );
}

function IconWritingLines(p: IconProps) {
  return (
    <IconBase {...p}>
      <rect x="6" y="6" width="28" height="28" rx="3" />
      <line x1="11" y1="15" x2="29" y2="15" />
      <line x1="11" y1="21" x2="25" y2="21" />
      <line x1="11" y1="27" x2="21" y2="27" />
    </IconBase>
  );
}

const MATERIAL_ICON_MAP: Record<string, (props: IconProps) => ReactNode> = {
  "kuku-drill": IconMultiplyBadge,
  "pref-quiz": IconMapPin,
  "fraction-basics-g2": IconPizzaSlice,
  "fraction-addition-g3": IconPizzaSlice,
  "fraction-equivalent-g4": IconPizzaSlice,
  "fraction-common-denominator-g5": IconPizzaSlice,
  "fraction-multiply-divide-g6": IconPizzaSlice,
  "kanji-quiz-g5": IconCharacterCard,
  "kanji-quiz-g6": IconCharacterCard,
  "vocab-flashcards-g5": IconFlashcard,
  "vocab-flashcards-g6": IconFlashcard,
  "vocab-flashcards-jhs1": IconFlashcard,
  "water-states-g4": IconDroplet,
  "water-states-particle-jhs1": IconDroplet,
  "visual-schedule": IconCalendarCheck,
  "visual-timer": IconHourglass,
  "feelings-check": IconFaceHeart,
  "communication-board": IconSpeechGlobe,
  "social-story": IconStoryBook,
  "expression-quiz": IconFaceQuiz,
  "turn-taking": IconTurnArrows,
  "eye-tracking": IconEye,
  "number-search": IconMagnifyNumbers,
  "shape-match": IconShapeCluster,
  "vocab-birthday-months-g5": IconCakeCandle,
  "vocab-town-directions-g5": IconSignpost,
  "vocab-summer-vacation-g6": IconSunUmbrella,
  "vocab-future-dreams-g6": IconStarShine,
  "length-basics-g2": IconRuler,
  "division-remainder-g3": IconGroupsRemainder,
  "percentage-basics-g5": IconBarPercent,
  "plant-growth-g3": IconFlowerSunflower,
  "circuit-basics-g3": IconBulbCircuit,
  "weather-temperature-g4": IconSunCloud,
  "trapezoid-area-g5": IconTrapezoidShape,
  "parallelogram-area-g5": IconParallelogramShape,
  "triangle-area-g5": IconTriangleShape,
  "polygon-angle-sum-g5": IconPentagonAngles,
  "circle-area-g6": IconCirclePie,
  "number-composition-g1": IconTenFrame,
  "addition-subtraction-g1": IconPlusMinusBadge,
  "clock-reading-g1": IconClockFace,
  "hiragana-practice-g1": IconHiraganaCard,
  "morning-glory-growth-g1": IconMorningGlory,
  "romaji-practice-g3": IconRomajiConvert,
  "subject-predicate-g2": IconSentenceUnderline,
  "idiom-proverb-quiz-g4": IconScroll,
  "keigo-basics-g5": IconBowPerson,
  "reflection-stars-lowgrade": IconStarRating,
  "reflection-text-midgrade": IconWritingLines,
};

export function MaterialIcon({ slug, className }: { slug: string; className?: string }) {
  const Render = MATERIAL_ICON_MAP[slug];
  if (Render) return <>{Render({ className })}</>;
  return <RainbowStar className={className} />;
}
