import { Mail, MapPin, Phone, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 grid gap-10 md:grid-cols-2 items-start">
      {/* Contact Info */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-lg bg-[#181B21] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#C8A96B] border border-[#C8A96B]/30">
          <Sparkles size={14} className="text-[#C8A96B]" />
          CONCIERGE & SUPPORT
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-[#F5F5F5] tracking-tight">
          Let’s Talk Pet Care
        </h1>
        <p className="text-xs sm:text-sm text-[#A7ADB7] leading-relaxed font-medium">
          Have questions about vet appointments, adoption listings, or platform features? Our dedicated support team is here to assist.
        </p>

        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#111318] shadow-2xl border border-white/10 glass-metal-hover">
            <div className="h-10 w-10 rounded-xl bg-[#181B21] text-[#C8A96B] border border-[#C8A96B]/30 grid place-items-center shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#A7ADB7] uppercase tracking-widest">EMAIL SUPPORT</p>
              <p className="text-sm font-black text-[#F5F5F5]">support@furshield.org</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#111318] shadow-2xl border border-white/10 glass-metal-hover">
            <div className="h-10 w-10 rounded-xl bg-[#181B21] text-[#8EA3B7] border border-[#8EA3B7]/30 grid place-items-center shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#A7ADB7] uppercase tracking-widest">CONCIERGE HELPLINE</p>
              <p className="text-sm font-black text-[#F5F5F5]">+92 300 1234567</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#111318] shadow-2xl border border-white/10 glass-metal-hover">
            <div className="h-10 w-10 rounded-xl bg-[#181B21] text-[#D6A84F] border border-[#D6A84F]/30 grid place-items-center shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-[#A7ADB7] uppercase tracking-widest">HEADQUARTERS</p>
              <p className="text-sm font-black text-[#F5F5F5]">DHA Phase 6, Karachi, Pakistan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="rounded-2xl bg-[#111318] p-6 sm:p-10 shadow-2xl border border-white/10 backdrop-blur-xl">
        <h2 className="text-lg font-black text-[#F5F5F5] uppercase tracking-wider mb-6">Send Us a Message</h2>

        {submitted ? (
          <div className="rounded-xl bg-[#3FA66B]/20 border border-[#3FA66B]/40 p-6 text-center space-y-2">
            <CheckCircle2 className="mx-auto text-[#3FA66B]" size={36} />
            <h3 className="font-black text-base text-[#F5F5F5] uppercase tracking-wider">Message Received!</h3>
            <p className="text-xs text-[#A7ADB7]">Thank you for reaching out. A representative will respond within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[#A7ADB7] mb-1.5">Your Full Name *</label>
              <input
                required
                type="text"
                placeholder="Areeba Ahmed"
                className="w-full rounded-xl border border-white/10 bg-[#181B21] px-4 py-2.5 text-xs text-[#F5F5F5] placeholder-[#6F7682] outline-none focus:border-[#C8A96B] focus:ring-1 focus:ring-[#C8A96B] transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[#A7ADB7] mb-1.5">Email Address *</label>
              <input
                required
                type="email"
                placeholder="areeba@example.com"
                className="w-full rounded-xl border border-white/10 bg-[#181B21] px-4 py-2.5 text-xs text-[#F5F5F5] placeholder-[#6F7682] outline-none focus:border-[#C8A96B] focus:ring-1 focus:ring-[#C8A96B] transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-[#A7ADB7] mb-1.5">Message *</label>
              <textarea
                required
                rows={4}
                placeholder="How can we help you or your pet today?"
                className="w-full rounded-xl border border-white/10 bg-[#181B21] px-4 py-2.5 text-xs text-[#F5F5F5] placeholder-[#6F7682] outline-none focus:border-[#C8A96B] focus:ring-1 focus:ring-[#C8A96B] transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#8C7445] to-[#C8A96B] hover:from-[#9E8450] hover:to-[#D4B577] py-3.5 text-xs font-black uppercase tracking-wider text-[#08090B] shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={16} /> Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
