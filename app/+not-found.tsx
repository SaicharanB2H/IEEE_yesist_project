import { Link, Stack } from 'expo-router';
import React from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView className="items-center justify-center flex-1 p-5">
        <ThemedText type="title" className="mb-4 text-center">This screen does not exist.</ThemedText>
        <Link href="/" className="py-4 mt-4">
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}
