import { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import Form from "@/components/search/form";
import Tab from "@/components/search/tab";
import Item from "@/components/search/friends/item";
import { useSession } from "next-auth/react";
import useMutation from "@/lib/client/useMutation";
import { IUserWithFriends } from "@/types";
import useUsers from "@/lib/client/useSwr/useUsers";
import Header from "@/components/header";
import TitleCol from "@/components/header/title-col";

const Search = () => {
  const { data: session } = useSession();
  const { data } = useUsers();
  const [currentTab, setCurrentTab] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<IUserWithFriends[]>([]);
  const { mutation: mutationAddFriend, loading: loadingAddFriend } =
    useMutation(`/api/users/${session?.user?.id}/friends/add`);
  const { mutation: mutationRemoveFriend, loading: loadingRemoveFriend } =
    useMutation(`/api/users/${session?.user?.id}/friends/delete`);

  const addFriend = (id: string) => {
    if (loadingAddFriend) return;
    mutationAddFriend({ friendId: id }, "POST");
  };
  const removeFriend = (id: string) => {
    if (loadingRemoveFriend) return;
    mutationRemoveFriend({ friendId: id }, "POST");
  };
  useEffect(() => {}, []);

  const selectTab = useCallback((index: number) => {
    setCurrentTab(index);
    resetSearch();
  }, []);
  const resetSearch = () => {
    setSearchValue("");
    setSearchResults([]);
  };

  const filterUsers = useCallback(
    (search: string) => {
      if (!search || !data?.users) return [];
      return data.users.filter((user) => {
        if (user.id === session?.user?.id) return;
        if (currentTab === 0) return user.name?.includes(search);
        if (currentTab === 1) return user.email?.includes(search);
      });
    },
    [currentTab, data?.users, session?.user?.id]
  );

  const setResultsWithDebounce = _.debounce(
    useCallback(
      (value: string) => {
        setSearchResults(filterUsers(value));
      },
      [filterUsers]
    ),
    200
  );
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      setResultsWithDebounce(e.target.value);
    },
    [setResultsWithDebounce]
  );
  return (
    <>
      <Header col1={<TitleCol>친구 검색</TitleCol>} />
      <div className="p-4">
        <div className="bg-soft-white p-4 clear-left rounded-xl border-2 border-primary-green">
          <Form
            handleSearch={handleSearch}
            searchValue={searchValue}
            resetSearch={resetSearch}
          />
          <Tab
            selectTab={selectTab}
            currentTab={currentTab}
            tabs={["닉네임", "이메일"]}
          />
          <div className="divide-y-2 divide-primary-green/30 mt-4">
            {searchResults.map((result) => {
              const myFriends = data?.users.find(
                (user) => user.id === session?.user?.id
              )?.friendsTo;
              const isFriend = !!myFriends?.find(
                (myFriend) => myFriend.id === result.id
              );
              return (
                <Item
                  key={result.id}
                  user={result}
                  isFriend={isFriend}
                  onClickFriend={isFriend ? removeFriend : addFriend}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Search;
