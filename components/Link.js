import cn from "classnames";
import LinkWrapper from "next/link";
import { useRouter } from "next/router";

export default function Lin({
  className,
  activeClassName,
  href,
  children,
  ...rest
}) {
  const router = useRouter();
  const active =
    router.pathname === href ||
    (href !== "/" && router.pathname.startsWith(href));
  const classNames = cn(className, {
    [activeClassName]: !!activeClassName && active,
  });

  const link = (
    <a {...rest} className={classNames}>
      {children}
    </a>
  );

  return (
    <LinkWrapper href={href}>
      <a className={classNames}>{children}</a>
    </LinkWrapper>
  );
}
