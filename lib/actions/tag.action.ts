'use server';
import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import { GetAllTagsParams, GetTopInteractedTagsParams } from './shared.types';
import Tag from '@/database/tag.model';

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    // find interactions for the user and group by tags...
    return [
      { _id: '1', name: 'next.js' },
      { _id: '2', name: 'React' },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    const tags = await Tag.find({});
    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
