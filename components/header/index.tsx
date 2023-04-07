import Link from "next/link";
import Plus from "../icon/plus";
import Search from "../icon/search";
import Filter from "../icon/filter";
import Check from "../icon/check";
import { useRouter } from "next/router";
import { useMemo } from "react";

const ICON_WIDTH = 6;
const ICON_DEFAULT_COLOR = "black";
const ICON_ACTIVE_COLOR = "red";

const Header = ({}) => {
  const { pathname } = useRouter();
  const hasBtn = useMemo(
    () => ({
      plus: pathname === "/" || pathname === "/tags",
      search:
        pathname === "/" ||
        pathname === "/archive" ||
        pathname === "/friends" ||
        pathname === "/tags",
      filter:
        pathname === "/" || pathname === "/archive" || pathname === "/tags",
      check: pathname === "/book/create",
    }),
    [pathname]
  );
  return (
    //h-9는 fixed임  h-9는 임의로 넣어준건데 나중에 자녀 높이 자동계산한 값으로 대신 넣어주자.
    <div className="relative w-full bg-slate-400 h-9">
      <div className="fixed flex items-center justify-between w-full max-w-lg px-2 py-1 bg-white">
        {/* 타이틀 */}
        <div className="text-lg font-bold text">page</div>
        <div className="flex gap-2">
          {hasBtn.plus && (
            <Link href="">
              <Plus width={ICON_WIDTH} color={ICON_DEFAULT_COLOR} />
            </Link>
          )}
          {hasBtn.search && (
            <button>
              <Search width={ICON_WIDTH} color={ICON_DEFAULT_COLOR} />
            </button>
          )}
          {hasBtn.filter && (
            <button>
              <Filter width={ICON_WIDTH} color={ICON_DEFAULT_COLOR} />
            </button>
          )}
          {hasBtn.check && (
            <button>
              <Check width={ICON_WIDTH} color={ICON_DEFAULT_COLOR} />
            </button>
          )}
        </div>
        {/* 책: 추가, 검색, 정렬/필터링 */}
        {/* 아카이브: 검색, 정렬/필터링 */}
        {/* 친구: 검색(검색에 친구 프로필 모달, 추가버튼 있음.) */}
        {/* 태그: 추가, 검색, 정렬/필터링 */}
      </div>
    </div>
  );
};
export default Header;
