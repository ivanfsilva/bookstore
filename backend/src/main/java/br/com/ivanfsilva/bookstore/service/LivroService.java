package br.com.ivanfsilva.bookstore.service;

import br.com.ivanfsilva.bookstore.domain.Livro;
import br.com.ivanfsilva.bookstore.repositories.LivroRepository;
import br.com.ivanfsilva.bookstore.service.exceptions.ObjectNotFoundExceptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    @Autowired
    LivroRepository repository;

    @Autowired
    CategoriaService categoriaService;

    public Livro findById(Integer id) {
        Optional<Livro> obj = repository.findById(id);

        return obj.orElseThrow( () -> new ObjectNotFoundExceptions(
                "Objeto não encontrado! id: " + id + ", Tipo: " + Livro.class.getName()));
    }

    public List<Livro> findAll(Integer idCat) {
        categoriaService.findById(idCat);

        return repository.findAllByCategoria(idCat);
    }
}
