const Footer = () => {
  return (
    <footer className="bg-surface border-t border-primary/10 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <p className="text-secondary text-sm">
            © {new Date().getFullYear()} Mohamed Elsheshtawey. All rights reserved.
          </p>
          <div className="mt-2">
            <div className="w-12 h-0.5 bg-gradient-primary mx-auto rounded-full opacity-60" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;