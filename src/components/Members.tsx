import BoardMembers from './BoardMembers';
import MembershipSteps from './MembershipSteps';
import MembersList from './MembersList';

function Members() {
  return (
    <div className='w-full overflow-hidden'>
      {/* Board Members Section */}
      <BoardMembers />
      
      {/* Membership Steps Section */}
      <MembershipSteps />
      
      {/* Members List Section */}
      <MembersList />
    </div>
  );
}

export default Members;