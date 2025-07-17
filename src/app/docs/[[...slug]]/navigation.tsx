"use client";

import { Button, DialogTitle, Drawer, ModalClose } from "@mui/joy";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

interface DocsNode {
  text: string;
  link?: string;
  children?: DocsNode[];
}

const DOCS_NODES: DocsNode[] = [
  {
    text: "Memos 是什么",
    link: "/docs",
  },
  {
    text: "安装",
    link: "/docs/install",
    children: [
      {
        text: "容器安装",
        link: "/docs/install/container-install",
      },
      {
        text: "数据库驱动",
        link: "/docs/install/database",
      },
      {
        text: "运行时选项",
        link: "/docs/install/runtime-options",
      },
      {
        text: "升级",
        link: "/docs/install/upgrade",
      },
      {
        text: "使用 HTTPS",
        link: "/docs/install/https",
      },
    ],
  },
  {
    text: "快速上手",
    children: [
      {
        text: "Memo",
        link: "/docs/getting-started/memo",
      },
      {
        text: "标签",
        link: "/docs/getting-started/tags",
      },
      {
        text: "资源",
        link: "/docs/getting-started/resources",
      },
      {
        text: "内容语法",
        link: "/docs/getting-started/content-syntax",
      },
      {
        text: "快捷键",
        link: "/docs/getting-started/shortcuts",
      },
    ],
  },
  {
    text: "高级设置",
    children: [
      {
        text: "Cloudflare R2",
        link: "/docs/advanced-settings/cloudflare-r2",
      },
      {
        text: "自定义样式和脚本",
        link: "/docs/advanced-settings/custom-style-and-script",
      },
      {
        text: "本地存储",
        link: "/docs/advanced-settings/local-storage",
      },
      {
        text: "单点登录 (SSO)",
        link: "/docs/advanced-settings/sso",
      },
      {
        text: "Webhook",
        link: "/docs/advanced-settings/webhook",
      },
    ],
  },
  {
    text: "安全性",
    children: [
      {
        text: "访问令牌",
        link: "/docs/security/access-tokens",
      },
    ],
  },
  {
    text: "集成",
    children: [
      {
        text: "Telegram 机器人",
        link: "/docs/integration/telegram-bot",
      },
    ],
  },
  {
    text: "参与贡献",
    children: [
      {
        text: "社区交流",
        link: "/docs/contribution/community",
      },
      {
        text: "开发代码",
        link: "/docs/contribution/development",
      },
      {
        text: "文档编写",
        link: "/docs/contribution/documentation",
      },
    ],
  },
  {
    text: "问题排查",
    link: "/docs/troubleshooting",
  },
];

const NavigationItem = ({ node, level }: { node: DocsNode; level: number }) => {
  const pathname = usePathname();

  return (
    <div className="w-full flex flex-col justify-start items-start">
      {node.link ? (
        <Link
          className={clsx(
            "hover:opacity-80",
            level === 0 ? "text-gray-600 font-medium" : "text-gray-500 sm:text-sm",
            node.link === pathname && "text-teal-600! font-medium",
          )}
          href={node.link}
        >
          {node.text}
        </Link>
      ) : (
        <div className={clsx("text-gray-600", level === 0 && "font-medium")}>{node.text}</div>
      )}
      {node.children && (
        <div className="w-full pt-2 flex flex-col justify-start items-start gap-2">
          {node.children.map((child) => {
            return <NavigationItem key={child.text} node={child} level={level + 1} />;
          })}
        </div>
      )}
    </div>
  );
};

const Navigation = () => {
  return (
    <div className="w-full flex flex-col justify-start items-start gap-4">
      {DOCS_NODES.map((node) => {
        return <NavigationItem key={node.text} node={node} level={0} />;
      })}
    </div>
  );
};

export const NavigationMobileMenu = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const toggleDrawer = (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }

    setOpen(inOpen);
  };

  return (
    <div>
      <Button
        color="neutral"
        size="sm"
        variant="outlined"
        onClick={toggleDrawer(true)}
        endDecorator={<Icon.ChevronRight className="w-5 h-auto" />}
      >
        Menu
      </Button>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <DialogTitle className="px-1">Documentations</DialogTitle>
        <ModalClose />
        <div className="w-full px-4 pt-4 pb-8">
          <Navigation />
        </div>
      </Drawer>
    </div>
  );
};

export default Navigation;
