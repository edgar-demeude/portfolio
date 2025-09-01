export default function LegalNotice() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-lg leading-relaxed">
      <h1 className="text-3xl font-semibold mb-6">Legal Notice</h1>
      
      <p>
        All photographs displayed on this website are the exclusive property of{' '}
        <strong>Edgar Demeude</strong>. Any reproduction, modification, or distribution, 
        even partial, is strictly prohibited without prior written permission.
      </p>

      <p className="mt-4">
        For any inquiries, please contact:{' '}
        <a href="mailto:edgardemeude@proton.me" className="underline hover:opacity-70">
          edgardemeude@proton.me
        </a>
      </p>

    </div>
  );
}
