package br.com.ivanfsilva.bookstore.repositories;

import br.com.ivanfsilva.bookstore.domain.Livro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LivroCategory extends JpaRepository<Livro, Integer> {
}
