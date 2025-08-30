"use client";

export default function ConsentButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
    >
      Review and Give Consent
    </button>
  );
}