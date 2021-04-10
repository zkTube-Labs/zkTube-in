import React, { useEffect } from 'react';
import { Avatar, Card } from '@alifd/next';
import store from '@/store';

const UserInfo = () => {
  const [userInfo, action] = store.useModel('user');
  const effectsState = store.useModelEffectsState('user');
  useEffect(() => {
    action.fetchUserProfile({ a: 'b' });
  }, []);

  console.log('userInfo', userInfo);

  return (
    <Card free>
      <Card.Header
        title="状态管理 - 全局状态"
      />
      <Card.Divider />
      <Card.Content>
        {effectsState.fetchUserProfile.isLoading && <div>loading...</div> }
        <Avatar size="small" src={userInfo.avatar} />
        <span style={{ marginLeft: 10 }}>{userInfo.name}</span>
      </Card.Content>
    </Card>
  );
};

export default UserInfo;
