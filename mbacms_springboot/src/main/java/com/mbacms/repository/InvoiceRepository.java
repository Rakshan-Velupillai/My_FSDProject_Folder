package com.mbacms.repository;

import com.mbacms.model.Invoice;
import com.mbacms.model.Patient;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.net.ContentHandler;
import java.util.List;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice,Integer> {

    @Query("""
       select i
       from Invoice i
       where i.healthcare.user.username=?1
       """)
    List<Invoice> getInvoicesByHealthcare(String name, Pageable pageable);

    List<Invoice> findByPatient(Patient patient);
}
