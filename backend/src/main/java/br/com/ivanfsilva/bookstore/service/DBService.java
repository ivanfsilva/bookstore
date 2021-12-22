package br.com.ivanfsilva.bookstore.service;

import br.com.ivanfsilva.bookstore.domain.Categoria;
import br.com.ivanfsilva.bookstore.domain.Livro;
import br.com.ivanfsilva.bookstore.repositories.CategoriaRepository;
import br.com.ivanfsilva.bookstore.repositories.LivroRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class DBService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private LivroRepository livroRepository;

    public void instanciaBaseDeDados() {
        Categoria cat1 = new Categoria(null, "Informática", "Livros de Informática");
        Categoria cat2 = new Categoria(null, "Ficção Científica", "Livros de Ficção Científica");
        Categoria cat3 = new Categoria(null, "Biografia", "Livros de Biografia");

        Livro l1 = new Livro(null, "Clean Code", "Robert C. Martin", "Lorem ipsum", cat1);
        Livro l2 = new Livro(null, "Engenharia de Software", "Louis", "Lorem ipsum", cat1);
        Livro l3 = new Livro(null, "The Time Machine", "H. G. Wells", "Lorem ipsum", cat2);
        Livro l4 = new Livro(null, "The War of the Words", "H. G. Wells", "Lorem ipsum", cat2);
        Livro l5 = new Livro(null, "I, Robot", "Isaac Asimov", "Lorem ipsum", cat2);

        cat1.getLivros().addAll(Arrays.asList(l1, l2));
        cat2.getLivros().addAll(Arrays.asList(l3, l4, l5));

        categoriaRepository.saveAll(Arrays.asList( cat1, cat2, cat3));
        livroRepository.saveAll(Arrays.asList(l1, l2, l3, l4, l5));
    }



}
