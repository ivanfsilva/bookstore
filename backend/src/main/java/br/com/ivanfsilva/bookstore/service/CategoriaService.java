package br.com.ivanfsilva.bookstore.service;

import br.com.ivanfsilva.bookstore.domain.Categoria;
import br.com.ivanfsilva.bookstore.repositories.CategoriaRepository;
import br.com.ivanfsilva.bookstore.service.exceptions.ObjectNotFoundExceptions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    CategoriaRepository categoriaRepository;

    public Categoria findById(Integer id) {
        Optional<Categoria> obj = categoriaRepository.findById(id);

        return obj.orElseThrow( () -> new ObjectNotFoundExceptions(
                "Objeto não encontrado! id: " + id + ", Tipo: " + Categoria.class.getName()));
    }

    public List<Categoria> findAll() {
        return categoriaRepository.findAll();
    }
}
