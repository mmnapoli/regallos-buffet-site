export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="bg-red-700 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold">Buffet Regallos</h1>
          <p className="text-lg mt-2">O melhor buffet da região</p>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-4">Bem-vindo!</h2>
        <p className="text-gray-600 mb-4">
          Escolha uma das seções para conhecer melhor nossos serviços.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 border rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">🍽️ Cardápio</h3>
            <p className="text-gray-600">Conheça nossa variedade de pratos deliciosos</p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">📸 Galeria</h3>
            <p className="text-gray-600">Veja fotos de nossos eventos</p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">📅 Reservas</h3>
            <p className="text-gray-600">Faça sua reserva conosco</p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">📞 Contato</h3>
            <p className="text-gray-600">Entre em contato via WhatsApp</p>
          </div>
        </div>
      </section>
    </main>
  )
}
