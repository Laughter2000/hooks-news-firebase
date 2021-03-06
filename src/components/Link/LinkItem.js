import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getDomain } from '../../utils';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { FirebaseContext } from '../../firebase';

function LinkItem({ link, index, showCount, history }) {
  const { user, firebase } = React.useContext(FirebaseContext);

  function handleVote() {
    if (!user) {
      history.push('/login');
    } else {
      const voteRef = firebase.db.collection('Links').doc(link.id);
      voteRef.get().then((doc) => {
        if (doc.exists) {
          const previousVotes = doc.data().votes;
          const vote = { votedBy: { id: user.uid, name: user.displayName } };
          const updatedVotes = [...previousVotes, vote];
          const voteCount = updatedVotes.length;
          voteRef.update({ votes: updatedVotes, voteCount });
        }
      });
    }
  }

  function handleDeleteLink() {
    const LinkRef = firebase.db.collection('Links').doc(link.id);
    LinkRef.delete()
      .then(() => {
        console.log(`Document with id ${link.id} deleted`);
      })
      .catch((err) => console.error('Error Deleting Document', err));
  }
  const postedByAuthUser = user && user.uid === link.postedBy.id;

  return (
    <div className="flex items-start mt3">
      <div className="flex items-center">
        {showCount && <span className="gray">{index}</span>}
        {/*eslint-disable-next-line*/}
        <div className="vote-button" role="img" arial-label="upvotes" onClick={handleVote}>
          🔺
        </div>
      </div>
      <div className="ml1">
        <div>
          <a href={link.url} className="black no-underline">
            {link.description}
          </a>{' '}
          <span className="link">({getDomain(link.url)})</span>
        </div>
        <div className="f6 lh-copy gray">
          {link.voteCount} votes by {link.postedBy.name} {distanceInWordsToNow(link.created)}
          {' | '}
          <Link to={`/link/${link.id}`}>
            {link.comments.length > 0 ? `${link.comments.length} comments` : 'discuss'}
          </Link>
          {postedByAuthUser && (
            <>
              {' | '}
              <span className="delete-button" onClick={handleDeleteLink}>
                delete
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(LinkItem);
