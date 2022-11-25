import { Box } from "@community-next/design-system/Box";
import { HStack, Stack } from "@community-next/design-system/Stack";
import { Text } from "@community-next/design-system/Typography";
import clsx from "clsx";
import { IconType } from "react-icons/lib";

export interface MenuLink {
  text: string;
  url: string;
  Icon: IconType;
  active?: boolean;
}

export interface MenuSection {
  title?: string;
  links: MenuLink[];
}

const SideMenuLink: React.FC<{ link: MenuLink }> = ({ link }) => (
  <HStack
    as="a"
    href={link.url}
    space={4}
    backgroundColor={link.active ? "blue" : undefined}
    color={link.active ? "blue" : "content3"}
    rounded
    className={clsx("p-3 items-center leading-tight", {
      "hover:bg-light-gray-background-secondary dark:hover:bg-light-gray-background-secondary":
        !link.active,
    })}
  >
    <link.Icon size="20" />
    <Text color={link.active ? "content1" : "content2"}>{link.text}</Text>
  </HStack>
);

const SideMenuSection: React.FC<{ section: MenuSection }> = ({ section }) => (
  <Box>
    {section.title ? (
      <Text textSize="xs" className="py-3 px-3">
        {section.title}
      </Text>
    ) : null}
    {section.links.map((link) => (
      <SideMenuLink key={link.text + link.url} link={link}></SideMenuLink>
    ))}
  </Box>
);

export interface SideMenuProps {
  sections: MenuSection[];
}

export const SideMenu: React.FC<SideMenuProps> = ({ sections }) => {
  return (
    <Stack space={4} className="px-3">
      {sections.map((section, i) => (
        <SideMenuSection key={section.title ?? "" + i} section={section} />
      ))}
    </Stack>
  );
};
