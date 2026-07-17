import { BackgroundEffects } from '@/components/auth/background-effects';
import { HeroSection } from '@/components/auth/hero-section';
import { LoginCard } from '@/components/auth/login-card';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <main className="flex w-full h-screen overflow-hidden relative">
      <BackgroundEffects />
      <div className="flex w-full h-full z-[2] relative">
        <HeroSection />
        <div className="flex-[0.9] flex items-center justify-center p-8 lg:p-16">
          <LoginCard>
            <LoginForm />
          </LoginCard>
        </div>
      </div>
    </main>
  );
}
