import { DonationRecord, VolunteerApplication, Comment } from '../types';

const STORAGE_KEYS = {
  DONATIONS: 'hopehorizon_donations_v1',
  VOLUNTEERS: 'hopehorizon_volunteers_v1',
  LIKED_POSTS: 'hopehorizon_liked_posts_v1',
  COMMENTS: 'hopehorizon_comments_v1',
  NEWSLETTER: 'hopehorizon_newsletter_v1',
};

// Donations
export function getSavedDonations(): DonationRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DONATIONS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error loading saved donations', e);
    return [];
  }
}

export function saveDonation(record: DonationRecord): DonationRecord[] {
  try {
    const existing = getSavedDonations();
    const updated = [record, ...existing];
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving donation', e);
    return [];
  }
}

// Volunteer Applications
export function getSavedVolunteerApps(): VolunteerApplication[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.VOLUNTEERS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error loading volunteer apps', e);
    return [];
  }
}

export function saveVolunteerApp(app: VolunteerApplication): VolunteerApplication[] {
  try {
    const existing = getSavedVolunteerApps();
    const updated = [app, ...existing];
    localStorage.setItem(STORAGE_KEYS.VOLUNTEERS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving volunteer app', e);
    return [];
  }
}

// Blog Post Likes
export function getLikedPostIds(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LIKED_POSTS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function togglePostLike(postId: string): boolean {
  try {
    const liked = getLikedPostIds();
    let newLiked: string[];
    let isNowLiked = false;
    if (liked.includes(postId)) {
      newLiked = liked.filter((id) => id !== postId);
      isNowLiked = false;
    } else {
      newLiked = [...liked, postId];
      isNowLiked = true;
    }
    localStorage.setItem(STORAGE_KEYS.LIKED_POSTS, JSON.stringify(newLiked));
    return isNowLiked;
  } catch (e) {
    return false;
  }
}

// Blog Comments
export function getSavedComments(postId?: string): Comment[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    const all: Comment[] = data ? JSON.parse(data) : [];
    if (postId) {
      return all.filter((c) => c.postId === postId);
    }
    return all;
  } catch (e) {
    return [];
  }
}

export function saveComment(comment: Comment): Comment[] {
  try {
    const all = getSavedComments();
    const updated = [comment, ...all];
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(updated));
    return updated.filter((c) => c.postId === comment.postId);
  } catch (e) {
    return [];
  }
}

// Newsletter
export function isSubscribedNewsletter(email: string): boolean {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.NEWSLETTER);
    const list: string[] = data ? JSON.parse(data) : [];
    return list.includes(email.toLowerCase());
  } catch (e) {
    return false;
  }
}

export function saveNewsletterSubscription(email: string): boolean {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.NEWSLETTER);
    const list: string[] = data ? JSON.parse(data) : [];
    if (!list.includes(email.toLowerCase())) {
      list.push(email.toLowerCase());
      localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(list));
    }
    return true;
  } catch (e) {
    return false;
  }
}
