import Link from "next/link";
import type { ReactNode } from "react";
import { titleCaseLabel } from "@/lib/titleCase";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "lg" | "md" | "sm";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
}

interface LinkButtonProps extends BaseProps {
  href: string;
  type?: never;
  onClick?: never;
  disabled?: never;
}

interface ActionButtonProps extends BaseProps {
  href?: never;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
}

type ButtonProps = LinkButtonProps | ActionButtonProps;

/**
 * Things that navigate render as <a>. Things that act render as <button>.
 * Never a clickable div.
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    withArrow = false,
    className = "",
    children,
  } = props;

  const classes =
    `${styles.base} ${styles[variant]} ${styles[size]} ${className}`.trim();

  /*
   * The label is title-cased here rather than at each of the ~90 call sites.
   * A control's label is a label however it was authored, and leaving it to
   * the caller is what left "Explore services" sitting beside "Get Found In
   * AI Search". titleCase() leaves any word that already carries a capital
   * alone, so SEO, AI, BizzFly and E-commerce pass through untouched and
   * calling it on an already-cased label is a no-op.
   */
  const content = (
    <>
      {titleCaseLabel(children)}
      {withArrow ? (
        <span className={styles.arrow} aria-hidden="true">
          &rarr;
        </span>
      ) : null}
    </>
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {content}
    </button>
  );
}

export function PrimaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button {...(props as ButtonProps)} variant="primary" />;
}

export function SecondaryButton(props: Omit<ButtonProps, "variant">) {
  return <Button {...(props as ButtonProps)} variant="secondary" />;
}

interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
}

export function ButtonGroup({ children, className = "" }: ButtonGroupProps) {
  return <div className={`${styles.group} ${className}`.trim()}>{children}</div>;
}
